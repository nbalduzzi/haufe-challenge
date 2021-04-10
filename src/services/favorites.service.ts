import { Inject, Singleton } from 'typescript-ioc';
import { IFavorite, IFavoriteService } from '../interfaces/favorites.interfaces';
import FavoriteRepository from '../repositories/favorites/favorite.repository';

@Singleton
export default class FavoriteService implements IFavoriteService {
    @Inject
    private readonly repository: FavoriteRepository;

    public async getUserFavorites(userId: string): Promise<IFavorite[]> {
        try {
            return await this.repository.getUserFavorites(userId);
        } catch (e) {
            console.error('FavoriteService.getUserFavorites', e);
            throw e;
        }
    }

    public async getUserFavorite(userId: string, characterId: string): Promise<IFavorite> {
        try {
            const favorite: IFavorite | undefined = await this.repository.getUserFavorite({ userId, characterId });
            if (!favorite) throw { statusCode: 404, message: 'favorite not found' };

            return favorite;
        } catch (e) {
            console.error('FavoriteService.get', e);
            throw e;
        }
    }

    public async addUserFavorite(userId: string, characterId: string): Promise<IFavorite> {
        try {
            return await this.repository.addUserFavorite({ userId, characterId });
        } catch (e) {
            console.error('FavoriteService.addUserFavorite', e);
            throw e;
        }
    }

    public async removeUserFavorite(userId: string, characterId: string): Promise<void> {
        try {
            await this.repository.removeUserFavorite({ userId, characterId });
        } catch (e) {
            console.error('FavoriteService.removeUserFavorite', e);
            throw e;
        }
    }

    public async isFavorite(characterId: string, userId: string): Promise<boolean> {
        const favorite: IFavorite | undefined = await this.repository.getUserFavorite({ userId, characterId });
        return favorite !== undefined;
    }
}
