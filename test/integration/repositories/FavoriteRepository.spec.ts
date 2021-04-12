import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { createSandbox, SinonSandbox } from 'sinon';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { IFavorite } from '../../../src/interfaces/favorites.interfaces';
import FavoriteRepository from '../../../src/repositories/favorites/favorite.repository';
import { FavoriteModel } from '../../../src/repositories/favorites/favorites.model';

chai.use(chaiAsPromised);

describe('Favorite Repository', () => {
    const repository: FavoriteRepository = new FavoriteRepository();
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

    describe('on want to get all favorites paginated', () => {
        describe('on ask for first page', () => {
            it('should return the favorite list', async () => {
                const favorite: IFavorite = { userId: 'someUserId', characterId: '1' };
                await repository.addUserFavorite(favorite);

                const favorites: IFavorite[] = await repository.getUserFavorites('someUserId');

                expect(favorites).to.be.not.empty;
                expect(favorites[0]).to.be.deep.equals(favorite);
            });
        });

        describe('on fail mongodb find method', () => {
            let sandbox: SinonSandbox;

            before(() => {
                sandbox = createSandbox();
                sandbox.stub(FavoriteModel, 'find').throws();
            });

            after(() => sandbox.restore());

            it('should throw error', () => {
                expect(repository.getUserFavorites('someUserId')).to.eventually.to.be.rejectedWith();
            });
        });
    });

    describe('on want to get a favorite', () => {
        describe('on ask for exist favorite', () => {
            it('should return the favorite', async () => {
                const favorite: IFavorite = { userId: 'someUserId', characterId: '1' };

                await repository.addUserFavorite(favorite);

                const favoriteFound: IFavorite | undefined = await repository.getUserFavorite(favorite);

                expect(favoriteFound).to.be.not.undefined;
                expect(favoriteFound!.userId).to.be.equals('someUserId');
                expect(favoriteFound!.characterId).to.be.equals('1');
            });
        });

        describe('on ask for not found favorite', () => {
            it('should throw 404 error', async () => {
                const favorite: IFavorite = { userId: 'notFoundUserId', characterId: '1' };
                expect(repository.getUserFavorite(favorite)).to.eventually.to.be.rejectedWith();
            });
        });

        describe('on fail mongodb findOne method', () => {
            let sandbox: SinonSandbox;

            before(() => {
                sandbox = createSandbox();
                sandbox.stub(FavoriteModel, 'findOne').throws();
            });

            after(() => sandbox.restore());

            it('should throw error', () => {
                const favorite: IFavorite = { userId: 'notFoundUserId', characterId: '1' };
                expect(repository.getUserFavorite(favorite)).to.eventually.to.be.rejectedWith();
            });
        });
    });

    describe('on want to add item to favorite list', () => {
        describe('on no exists previous item', () => {
            it('should add new favorite', async () => {
                const favorite: IFavorite = { userId: 'newUserId', characterId: '1' };
                const favoriteAdded: IFavorite = await repository.addUserFavorite(favorite);

                expect(favoriteAdded).to.be.deep.equals(favorite);
            });
        });

        describe('on existes previous item', () => {
            it('should throw error', async () => {
                const favorite: IFavorite = { userId: 'newUserId', characterId: '1' };
                await repository.addUserFavorite(favorite);

                expect(repository.addUserFavorite(favorite)).to.eventually.be.rejectedWith();
            });
        });

        describe('on fail mongodb create method', () => {
            let sandbox: SinonSandbox;

            before(() => {
                sandbox = createSandbox();
                sandbox.stub(FavoriteModel, 'create').throws();
            });

            after(() => sandbox.restore());

            it('should throw error', () => {
                const favorite: IFavorite = { userId: 'notFoundUserId', characterId: '1' };
                expect(repository.addUserFavorite(favorite)).to.eventually.to.be.rejectedWith();
            });
        });
    });

    describe('on want to remove a character from favorite list', () => {
        describe('on exists item', () => {
            it('should remove the favorite', async () => {
                const favorite: IFavorite = { userId: 'newUserId', characterId: '1' };
                await repository.addUserFavorite(favorite);

                expect(repository.removeUserFavorite(favorite)).to.eventually.not.be.rejectedWith();
                expect(repository.getUserFavorite(favorite)).to.eventually.be.rejectedWith();
            });
        });

        describe('on no exists item', () => {
            it('should throw error', async () => {
                const favorite: IFavorite = { userId: 'newUserId', characterId: '1' };
                expect(repository.removeUserFavorite(favorite)).to.eventually.be.rejectedWith();
            });
        });

        describe('on fail mongodb deleteOne method', () => {
            let sandbox: SinonSandbox;

            before(() => {
                sandbox = createSandbox();
                sandbox.stub(FavoriteModel, 'deleteOne').throws();
            });

            after(() => sandbox.restore());

            it('should throw error', () => {
                const favorite: IFavorite = { userId: 'notFoundUserId', characterId: '1' };
                expect(repository.removeUserFavorite(favorite)).to.eventually.to.be.rejectedWith();
            });
        });
    });
});
