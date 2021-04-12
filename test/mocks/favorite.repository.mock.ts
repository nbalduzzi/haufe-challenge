import { IFavorite, IFavoriteRepository } from '../../src/interfaces/favorites.interfaces';

export class FavoriteRepositoryMock implements IFavoriteRepository {
    public async getUserFavorite(): Promise<IFavorite | undefined> {
        return { userId: 'someUserId', characterId: '1' };
    }

    public async getUserFavorites(userId: string): Promise<IFavorite[]> {
        return Promise.resolve([{ userId, characterId: '1' }]);
    }

    public async addUserFavorite(): Promise<IFavorite> {
        return Promise.resolve({ userId: 'someUserId', characterId: '1' });
    }

    public async removeUserFavorite(): Promise<void> {
        Promise.resolve();
    }
}

export class FavoriteRepositoryFailMock implements IFavoriteRepository {
    public async getUserFavorite(): Promise<IFavorite | undefined> {
        throw { statusCode: 500, message: 'fail' };
    }

    public async getUserFavorites(): Promise<IFavorite[]> {
        throw { statusCode: 500, message: 'fail' };
    }

    public async addUserFavorite(): Promise<IFavorite> {
        throw { statusCode: 500, message: 'fail' };
    }

    public async removeUserFavorite(): Promise<void> {
        throw { statusCode: 500, message: 'fail' };
    }
}

export class FavoriteRepositoryNotFoundMock implements IFavoriteRepository {
    public async getUserFavorite(): Promise<IFavorite | undefined> {
        return Promise.resolve(undefined);
    }

    public async getUserFavorites(): Promise<IFavorite[]> {
        return Promise.resolve(undefined);
    }

    public async addUserFavorite(): Promise<IFavorite> {
        return Promise.resolve(undefined);
    }

    public async removeUserFavorite(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
