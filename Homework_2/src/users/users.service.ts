import { v4 } from 'uuid';
import { DeleteResult, getConnection, UpdateResult } from "typeorm";

import { config } from '../config';
import { UsersRepository } from "./users.repository";
import { RequestGetAutoSuggestUsers, UserType } from "./users.types";

export class UsersService {
    private usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = getConnection(config.DB_CONNECTION_NAME).getCustomRepository(UsersRepository);
    }

    public async add({ login, password, age }: UserType): Promise<UserType> {
        return this.usersRepository.save({
            id: v4(), login, password, age, isDeleted: false
        });
    }

    public async getAutoSuggestUsers({ loginSubstring, limit }: RequestGetAutoSuggestUsers): Promise<UserType[] | []>{
        const end = limit ?? '-1';
        const users: UserType[] = await this.usersRepository.find();
        return users
            .filter(v => loginSubstring != null ? v.login.includes(loginSubstring) : v)
            .sort((a, b) => {
                const loginA = a.login.toLowerCase();
                const loginB = b.login.toLowerCase();
                if (loginA < loginB) return -1;
                if (loginA > loginB) return 1;
                return 0;
            })
            .slice(0, +end);
    }

    public async findById(id: string): Promise<UserType[] | []> {
        return this.usersRepository.findByIds([id]);
    }

    public async update(id: string, { login, password, age }: Partial<UserType>): Promise<UpdateResult> {
        return this.usersRepository.update(id, { login, password, age });
    }

    public async remove(id: string): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }
}
