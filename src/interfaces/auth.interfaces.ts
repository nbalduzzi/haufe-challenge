import { IUser } from './users.interfaces';

export interface IAuthService {
    isAuthorized(user: IUser, password: string): Promise<boolean>;
    generateToken(username: string): string;
    getUserIdFromToken(token?: string): string | undefined;
}

export interface IAuthLoginRequest {
    username: string;
    password: string;
}

export interface IAuthResponse {
    userId: string;
    username: string;
    access_token: string;
    timestamp: number;
}
