import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Container, Snapshot } from 'typescript-ioc';

chai.use(chaiAsPromised);

import UserService from '../../../src/services/user.service';
import UserRepository from '../../../src/repositories/users/user.repository';
import {
    UserRepositoryFailMock,
    UserRepositoryMock,
    UserRepositoryNotFoundMock,
} from '../../mocks/user.repository.mock';
import { IUser, IUserService, UserStatus } from '../../../src/interfaces/users.interfaces';

describe('User Service', () => {
    const snapshot: Snapshot = Container.snapshot(UserRepository);

    afterEach(() => snapshot.restore());

    describe('on want to get an user by username', () => {
        describe('on success repository call', () => {
            describe('on ask for some username', () => {
                before(() => Container.bind(UserRepository).to(UserRepositoryMock));

                it('should return the user', async () => {
                    const service: IUserService = new UserService();
                    const user: IUser = await service.getByUsername('someUsername');

                    expect(user.userId).to.be.equals('someUserId');
                    expect(user.username).to.be.equals('someUsername');
                    expect(user.password).to.be.equals('someCryptedPassword');
                    expect(user.status).to.be.equals(UserStatus.OK);
                });
            });

            describe('on ask for not found user', () => {
                before(() => Container.bind(UserRepository).to(UserRepositoryNotFoundMock));

                it('should throw 404 error', async () => {
                    const service: IUserService = new UserService();
                    expect(service.getByUsername('notFoundUsername')).to.eventually.to.be.rejectedWith();
                });
            });
        });

        describe('on repository call fails', () => {
            before(() => Container.bind(UserRepository).to(UserRepositoryFailMock));

            describe('on repository getByUsername method call', () => {
                it('should throw error', async () => {
                    const service: IUserService = new UserService();
                    expect(service.getByUsername('someUsername')).to.eventually.be.rejectedWith();
                });
            });
        });
    });

    describe('on want to register user', () => {
        describe('on success repository call', () => {
            describe('on register new user', () => {
                before(() => Container.bind(UserRepository).to(UserRepositoryMock));

                it('should add new user', async () => {
                    const service: IUserService = new UserService();
                    const user: IUser = await service.register('someUsername', 'somePassword');

                    expect(user.username).to.be.equals('someUsername');
                    expect(user.userId).to.be.not.empty;
                    expect(user.password).to.contains('=');
                });
            });
        });

        describe('on repository call fails', () => {
            before(() => Container.bind(UserRepository).to(UserRepositoryFailMock));

            describe('on repository register method call call', () => {
                it('should throw error', async () => {
                    const service: IUserService = new UserService();
                    expect(service.register('someUsername', 'somePassword')).to.eventually.be.rejectedWith();
                });
            });
        });
    });
});
