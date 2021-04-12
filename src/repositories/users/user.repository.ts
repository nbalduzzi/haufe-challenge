import { Singleton } from 'typescript-ioc';
import { v4 } from 'uuid';
import { IUser, IUserRepository } from '../../interfaces/users.interfaces';
import { UserModel } from './user.model';
import { IUserDocument } from './user.types';

@Singleton
export default class UserRepository implements IUserRepository {
    public async getUserByUsername(username: string): Promise<IUser | undefined> {
        try {
            const doc: IUserDocument | null = await UserModel.findOne({ username });
            return doc ? doc.toJSON() : undefined;
        } catch (e) {
            console.error('UserRepository.getUserByUsername', e);
            throw e;
        }
    }

    public async addUser(user: IUser): Promise<IUser> {
        try {
            const userExists: IUser | undefined = await this.getUserByUsername(user.username);
            if (userExists) throw { statusCode: 400, message: 'user already exists' };

            const doc: IUserDocument = await UserModel.create({ ...user, userId: v4() });
            return doc.toJSON();
        } catch (e) {
            console.error('UserRepository.addUser', e);
            throw e;
        }
    }

    public async updateUser({ userId, ...rest }: IUser): Promise<void> {
        try {
            await UserModel.updateOne({ userId }, { $set: { ...rest } });
        } catch (e) {
            console.error('UserRepository.updateUser', e);
            throw e;
        }
    }

    public async removeUser(userId: string): Promise<void> {
        try {
            await UserModel.deleteOne({ userId });
        } catch (e) {
            console.error('UserRepository.removeUser', e);
            throw e;
        }
    }
}
