import { sign, verify } from 'jsonwebtoken';
import { createHash } from 'crypto';
import { Singleton } from 'typescript-ioc';
import { IUser, UserStatus } from '../interfaces/users.interfaces';
import { IAuthResponse, IAuthService } from '../interfaces/auth.interfaces';

@Singleton
export default class AuthService implements IAuthService {
    public async isAuthorized(user: IUser, password: string): Promise<boolean> {
        return user.status === UserStatus.OK && user.password === this.encrypt(password);
    }

    public generateToken(userId: string): string {
        return sign({ userId }, process.env.SECRET!, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRATION });
    }

    public getUserIdFromToken(token: string): string {
        return AuthService.verifyToken(token).userId;
    }

    public static verifyToken(token: string): IAuthResponse {
        return verify(token, process.env.SECRET!, { algorithms: ['HS256'] }) as IAuthResponse;
    }

    private encrypt(password: string): string {
        return createHash('sha256').update(password).digest('base64');
    }
}
