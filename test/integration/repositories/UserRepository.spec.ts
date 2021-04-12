import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { createSandbox, SinonSandbox } from 'sinon';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { v4 } from 'uuid';

import { IUser, UserStatus } from '../../../src/interfaces/users.interfaces';
import UserRepository from '../../../src/repositories/users/user.repository';
import { UserModel } from '../../../src/repositories/users/user.model';

chai.use(chaiAsPromised);

describe('User Repository', () => {
    const repository: UserRepository = new UserRepository();
    let mongoServer: MongoMemoryServer;

    before(async () => {
        mongoServer = new MongoMemoryServer();
        await mongoose.connect(await mongoServer.getUri(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('on want to get an user', () => {
        describe('on ask for some username', () => {
            it('should return the user', async () => {
                const user: IUser = {
                    username: 'usernameTest',
                    password: 'someCryptedPassword',
                    status: UserStatus.OK,
                    lastConnection: Date.now(),
                };

                const userCreated: IUser = await repository.addUser(user);

                const userFound: IUser | undefined = await repository.getUserByUsername('usernameTest');

                expect(userFound).to.be.not.undefined;
                expect(userFound!.userId!).to.be.equals(userCreated.userId!);
                expect(userFound!.username).to.be.equals('usernameTest');
                expect(userFound!.status).to.be.equals(UserStatus.OK);

                await repository.removeUser(user.userId!);
            });
        });

        describe('on ask for not found user', () => {
            it('should throw 404 error', async () => {
                expect(repository.getUserByUsername('notFoundUsername')).to.eventually.to.be.rejectedWith();
            });
        });

        describe('on empty key', () => {
            it('should throw error', async () => {
                expect(repository.getUserByUsername('')).to.eventually.to.be.rejectedWith();
            });
        });

        describe('on fail mongodb findOne method', () => {
            let sandbox: SinonSandbox;

            before(() => {
                sandbox = createSandbox();
                sandbox.stub(UserModel, 'findOne').throws();
            });

            after(() => sandbox.restore());

            it('should throw error', () => {
                expect(repository.getUserByUsername('someUsername')).to.eventually.to.be.rejectedWith();
            });
        });
    });

    describe('on want to add an user', () => {
        describe('on username key specified', () => {
            it('should add new user', async () => {
                const user: IUser = {
                    username: 'otherUsername',
                    password: 'someCryptedPassword',
                    status: UserStatus.OK,
                    lastConnection: Date.now(),
                };

                const userCreated: IUser = await repository.addUser(user);

                expect(userCreated.userId).to.not.be.undefined;
                expect(userCreated.username).to.be.equals(user.username);
                expect(userCreated.status).to.be.equals(user.status);
            });
        });

        describe('on username already exists', () => {
            it('should throw already exists error', async () => {
                const user: IUser = {
                    username: 'otherUsername',
                    password: 'someCryptedPassword',
                    status: UserStatus.OK,
                    lastConnection: Date.now(),
                };

                expect(repository.addUser(user)).to.eventually.to.be.rejectedWith();
            });
        });

        describe('on fail mongodb create method', () => {
            let sandbox: SinonSandbox;

            before(() => {
                sandbox = createSandbox();
                sandbox.stub(UserModel, 'create').throws();
            });

            after(() => sandbox.restore());

            it('should throw error', () => {
                const user: IUser = {
                    username: 'usernameTest',
                    password: 'someCryptedPassword',
                    status: UserStatus.OK,
                    lastConnection: Date.now(),
                };

                expect(repository.addUser(user)).to.eventually.to.be.rejectedWith();
            });
        });
    });

    describe('on want to remove an user', () => {
        describe('on username key specified', () => {
            it('should remove the user', async () => {
                const user: IUser = {
                    userId: v4(),
                    username: '',
                    password: 'someCryptedPassword',
                    status: UserStatus.OK,
                    lastConnection: Date.now(),
                };

                await repository.addUser(user);

                expect(repository.removeUser('usernameTest')).to.eventually.not.be.rejectedWith();
                expect(repository.getUserByUsername('usernameTest')).to.eventually.be.rejectedWith();
            });
        });

        describe('on username empty key', () => {
            it('should throw error', async () => {
                expect(repository.removeUser('')).to.eventually.be.rejectedWith();
            });
        });

        describe('on fail mongodb deleteOne method', () => {
            let sandbox: SinonSandbox;

            before(() => {
                sandbox = createSandbox();
                sandbox.stub(UserModel, 'deleteOne').throws();
            });

            after(() => sandbox.restore());

            it('should throw error', () => {
                expect(repository.removeUser('')).to.eventually.to.be.rejectedWith();
            });
        });
    });

    describe('on want to update an user', () => {
        describe('on exist user to update', () => {
            it('should remove the user', async () => {
                const user: IUser = {
                    username: 'usernameToUpdate',
                    password: 'someCryptedPassword',
                    status: UserStatus.OK,
                    lastConnection: Date.now(),
                };

                const userCreated: IUser = await repository.addUser(user);
                await repository.updateUser({ ...userCreated, status: UserStatus.BANNED });

                const userUpdated: IUser | undefined = await repository.getUserByUsername('usernameToUpdate');

                expect(userUpdated).to.not.be.undefined;
                expect(userUpdated!.status).to.be.equals(UserStatus.BANNED);
                expect(userCreated.status).to.be.equals(UserStatus.OK);
            });
        });

        describe('on fail mongodb updateOne method', () => {
            let sandbox: SinonSandbox;

            before(() => {
                sandbox = createSandbox();
                sandbox.stub(UserModel, 'updateOne').throws();
            });

            after(() => sandbox.restore());

            it('should throw error', () => {
                const user: IUser = {
                    username: 'usernameToUpdate',
                    password: 'someCryptedPassword',
                    status: UserStatus.OK,
                    lastConnection: Date.now(),
                };

                expect(repository.updateUser(user)).to.eventually.to.be.rejectedWith();
            });
        });
    });
});
