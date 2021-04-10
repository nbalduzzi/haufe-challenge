import { Inject, Singleton } from 'typescript-ioc';
import { v4 } from 'uuid';
import { createHash } from 'crypto';
import { IUser, IUserService, UserStatus } from '../interfaces/users.interfaces';
import UserRepository from '../repositories/users/user.repository';

@Singleton
export default class UserService implements IUserService {
    @Inject
    private repository: UserRepository;

    public async register(username: string, password: string): Promise<IUser> {
        try {
            const user: IUser = {
                userId: v4(),
                username,
                password: createHash('sha256').update(password).digest('base64'),
                lastConnection: Date.now(),
                status: UserStatus.OK,
            };

            await this.repository.addUser(user);
            return user;
        } catch (e) {
            console.error('UserService.register', e);
            throw e;
        }
    }

    public async getByUsername(username: string): Promise<IUser> {
        try {
            const user: IUser | undefined = await this.repository.getUserByUsername(username);
            if (!user) throw { statusCode: 404, message: 'user not found' };

            return user;
        } catch (e) {
            console.error('UserService.getByUsername', e);
            throw e;
        }
    }

    public async updateLastConnection(username: string): Promise<IUser> {
        try {
            const user: IUser = await this.getByUsername(username);
            user.lastConnection = Date.now();

            await this.repository.updateUser(user);
            return user;
        } catch (e) {
            console.error('UserService.updateLastConnection', e);
            throw e;
        }
    }
}
