import {RequestGetAutoSuggestUsers, UserType} from "./types";
import {v4} from 'uuid';

const store: UserType[] = [];

export const add = async (body: UserType): Promise<UserType> => {
    const { login, password, age } = body;
    store.push({id: v4(), login, password, age, isDeleted: false});
    return store[store.length - 1];
}

export const findById = async (id: string): Promise<UserType | null> => {
    const user = await store.find((value: UserType) => value.id === id);
    if (!user) return null;
    return user;
}

export const update = async (id: string, { login, password, age }: Partial<UserType>): Promise<UserType | null> => {
    const user = await findById(id);
    if (!user) return null;
    if (login != null) user.login = login;
    if (password != null) user.password = password;
    if (age != null) user.age = age;
    store.forEach(u => u.id === id ? user : u);
    return findById(id)
}

export const remove = async (id: string): Promise<UserType | null> => {
    const user = await findById(id);
    if (!user) return null;
    store.forEach(u => u.id === id ? user.isDeleted = true : u);
    return findById(id)
}

export const getAutoSuggestUsers = async ({ loginSubstring, limit }: RequestGetAutoSuggestUsers): Promise<UserType[] | []> => {
    const end = limit ?? '-1'
    return store
        .filter(v => loginSubstring != null ? v.login.includes(loginSubstring) : v)
        .sort((a, b) => {
            const loginA = a.login.toLowerCase();
            const loginB = b.login.toLowerCase();
            if (loginA < loginB) return -1;
            if (loginA > loginB) return 1;
            return 0;
        })
        .slice(0, +end)
}
