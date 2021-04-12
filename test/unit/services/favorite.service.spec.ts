import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Container, Snapshot } from 'typescript-ioc';
import FavoriteService from '../../../src/services/favorites.service';
import { IFavorite, IFavoriteService } from '../../../src/interfaces/favorites.interfaces';
import {
    FavoriteRepositoryFailMock,
    FavoriteRepositoryMock,
    FavoriteRepositoryNotFoundMock,
} from '../../mocks/favorite.repository.mock';
import FavoriteRepository from '../../../src/repositories/favorites/favorite.repository';

chai.use(chaiAsPromised);
describe('Favorite Service', () => {
    const snapshot: Snapshot = Container.snapshot(FavoriteRepository);

    afterEach(() => snapshot.restore());

    describe('on want to get character from favorites', () => {
        describe('on success repository call', () => {
            describe('on ask for id 1', () => {
                before(() => Container.bind(FavoriteRepository).to(FavoriteRepositoryMock));

                it('should return the Rick Sanchez character', async () => {
                    const service: IFavoriteService = new FavoriteService();
                    const favorite: IFavorite = await service.getUserFavorite('someUserId', '1');

                    expect(favorite.userId).to.be.equals('someUserId');
                    expect(favorite.characterId).to.be.equals('1');
                });
            });

            describe('on ask for not found character', () => {
                before(() => Container.bind(FavoriteRepository).to(FavoriteRepositoryNotFoundMock));

                it('should throw 404 error', async () => {
                    const service: IFavoriteService = new FavoriteService();
                    expect(service.getUserFavorite('someUserId', 'notFoundId')).to.eventually.to.be.rejectedWith();
                });
            });
        });

        describe('on repository call fails', () => {
            before(() => Container.bind(FavoriteRepository).to(FavoriteRepositoryFailMock));

            describe('on repository get method call', () => {
                it('should throw error', async () => {
                    const service: IFavoriteService = new FavoriteService();
                    expect(service.getUserFavorite('userId', 'characterId')).to.eventually.be.rejectedWith();
                });
            });
        });
    });

    describe('on want to add character to favorites', () => {
        describe('on success repository call', () => {
            describe('on add character with id 1', () => {
                before(() => Container.bind(FavoriteRepository).to(FavoriteRepositoryMock));

                it('should add the Rick Sanchez character', async () => {
                    const service: IFavoriteService = new FavoriteService();
                    expect(service.addUserFavorite('userId', 'characterId')).to.eventually.not.rejectedWith();
                });
            });
        });

        describe('on repository call fails', () => {
            before(() => Container.bind(FavoriteRepository).to(FavoriteRepositoryFailMock));

            describe('on repository add method call call', () => {
                it('should throw error', async () => {
                    const service: IFavoriteService = new FavoriteService();
                    expect(service.addUserFavorite('userId', 'characterId')).to.eventually.be.rejectedWith();
                });
            });
        });
    });

    describe('on want to remove character from favorites', () => {
        describe('on success repository call', () => {
            describe('on remove character with id 1', () => {
                before(() => Container.bind(FavoriteRepository).to(FavoriteRepositoryMock));

                it('should remove the Rick Sanchez character', async () => {
                    const service: IFavoriteService = new FavoriteService();
                    expect(service.removeUserFavorite('userId', 'characterId')).to.eventually.not.rejectedWith();
                });
            });
        });

        describe('on repository call fails', () => {
            before(() => Container.bind(FavoriteRepository).to(FavoriteRepositoryFailMock));

            describe('on repository remove method call call', () => {
                it('should throw error', async () => {
                    const service: IFavoriteService = new FavoriteService();
                    expect(service.removeUserFavorite('userId', 'characterId')).to.eventually.be.rejectedWith();
                });
            });
        });
    });

    describe('on want to check if character is in favorites', () => {
        describe('on success repository call', () => {
            describe('on ask for id 1', () => {
                before(() => Container.bind(FavoriteRepository).to(FavoriteRepositoryMock));

                it('should return true', async () => {
                    const service: IFavoriteService = new FavoriteService();
                    expect(service.isFavorite('userId', 'characterId')).to.eventually.be.true;
                });
            });
        });
    });
});
