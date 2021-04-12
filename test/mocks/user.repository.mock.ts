import { IUser, IUserRepository, UserStatus } from '../../src/interfaces/users.interfaces';

export class UserRepositoryMock implements IUserRepository {
    public async getUserByUsername(username: string): Promise<IUser | undefined> {
        return Promise.resolve({
            username,
            status: UserStatus.OK,
            userId: 'someUserId',
            lastConnection: Date.now(),
            password: 'someCryptedPassword',
        });
    }

    public async addUser(user: IUser): Promise<IUser> {
        return Promise.resolve({
            ...user,
            status: UserStatus.OK,
            userId: 'someUserId',
            lastConnection: Date.now(),
            password: 'someCryptedPassword',
        });
    }

    public async updateUser(): Promise<void> {
        Promise.resolve();
    }

    public async removeUser(): Promise<void> {
        Promise.resolve();
    }
}

export class UserRepositoryFailMock implements IUserRepository {
    public async getUserByUsername(): Promise<IUser | undefined> {
        throw { statusCode: 500, message: 'fail' };
    }

    public async addUser(): Promise<IUser> {
        throw { statusCode: 500, message: 'fail' };
    }

    public async updateUser(): Promise<void> {
        throw { statusCode: 500, message: 'fail' };
    }

    public async removeUser(): Promise<void> {
        throw { statusCode: 500, message: 'fail' };
    }
}

export class UserRepositoryNotFoundMock implements IUserRepository {
    public async getUserByUsername(): Promise<IUser | undefined> {
        return Promise.resolve(undefined);
    }

    public async addUser(): Promise<IUser> {
        return Promise.resolve(undefined);
    }

    public async updateUser(): Promise<void> {
        Promise.resolve();
    }

    public async removeUser(): Promise<void> {
        Promise.resolve();
    }
}
