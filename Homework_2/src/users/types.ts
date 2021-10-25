export type UserType = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type RequestGetAutoSuggestUsers = {
    loginSubstring?: string;
    limit?: string;
}
