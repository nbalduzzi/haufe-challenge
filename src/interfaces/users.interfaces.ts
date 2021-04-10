export interface IUserRepository {
    getUserByUsername(username: string): Promise<IUser | undefined>;
    addUser(user: IUser): Promise<IUser>;
    updateUser(user: IUser): Promise<void>;
    removeUser(userId: string): Promise<void>;
}

export interface IUserService {
    register(username: string, password: string): Promise<IUser>;
    getByUsername(username: string): Promise<IUser>;
    updateLastConnection(username: string): Promise<IUser>;
}

export enum UserStatus {
    OK = 'OK',
    DELETED = 'DELETED',
    BANNED = 'BANNED',
}

export interface IUser {
    userId: string;
    username: string;
    password: string;
    status: UserStatus;
    lastConnection: number;
}

export interface IUserRegister {
    username: string;
    password: string;
}
