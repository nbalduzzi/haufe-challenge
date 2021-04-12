import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { createHash } from 'crypto';
import { IAuthService } from '../../../src/interfaces/auth.interfaces';
import { IUser, UserStatus } from '../../../src/interfaces/users.interfaces';
import AuthService from '../../../src/services/auth.service';

chai.use(chaiAsPromised);

describe('Auth Service', () => {
    const service: IAuthService = new AuthService();

    describe('on want to generate a jwt from password', () => {
        describe('on given username', () => {
            it('should return the json web token', (done: any) => {
                const token: string = service.generateToken('someUsername');

                expect(token).to.be.not.undefined;
                expect(token).to.contains('.');
                done();
            });
        });
    });

    describe('on want to veify the jwt', () => {
        describe('on invalid jwt', () => {
            it('should throw error', (done: any) => {
                expect(() => AuthService.verifyToken('someToken')).to.throws();
                done();
            });
        });

        describe('on valid jwt', () => {
            it('should not throw error', (done: any) => {
                const token: string = service.generateToken('someUsername');

                expect(() => AuthService.verifyToken(token)).to.not.throws();
                done();
            });
        });
    });

    describe('on given user', () => {
        describe('on status BANNED', () => {
            it('should return false', () => {
                const user: IUser = {
                    status: UserStatus.BANNED,
                    username: 'someUsername',
                    password: 'somePassword',
                    userId: 'someUserId',
                    lastConnection: Date.now(),
                };

                expect(service.isAuthorized(user, 'somePassword')).to.eventually.be.false;
            });
        });

        describe('on status DELETED', () => {
            it('should return false', () => {
                const user: IUser = {
                    status: UserStatus.DELETED,
                    username: 'someUsername',
                    password: 'somePassword',
                    userId: 'someUserId',
                    lastConnection: Date.now(),
                };

                expect(service.isAuthorized(user, 'somePassword')).to.eventually.be.false;
            });
        });

        describe('on status OK', () => {
            describe('on not match password', () => {
                it('should return false', () => {
                    const user: IUser = {
                        status: UserStatus.OK,
                        username: 'someUsername',
                        password: 'somePassword',
                        userId: 'someUserId',
                        lastConnection: Date.now(),
                    };

                    expect(service.isAuthorized(user, 'someOtherPassword')).to.eventually.be.false;
                });
            });

            describe('on match password', () => {
                it('should return true', () => {
                    const password: string = createHash('sha256').update('somePassword').digest('base64');

                    const user: IUser = {
                        status: UserStatus.OK,
                        username: 'someUsername',
                        password: password,
                        userId: 'someUserId',
                        lastConnection: Date.now(),
                    };

                    expect(service.isAuthorized(user, 'somePassword')).to.eventually.be.true;
                });
            });
        });
    });
});
