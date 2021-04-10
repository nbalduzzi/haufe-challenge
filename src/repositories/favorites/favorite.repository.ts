import { Singleton } from 'typescript-ioc';
import { IFavoriteRepository, IFavorite } from '../../interfaces/favorites.interfaces';
import { FavoriteModel } from './favorites.model';
import { IFavoriteDocument } from './favorites.types';

@Singleton
export default class FavoriteRepository implements IFavoriteRepository {
    public async getUserFavorites(userId: string): Promise<IFavorite[]> {
        try {
            const doc: IFavoriteDocument[] = await FavoriteModel.find({ userId });
            return doc.map((f: IFavoriteDocument) => f.toJSON());
        } catch (e) {
            console.error('FavoriteRepository.getAll', e);
            throw e;
        }
    }

    public async getUserFavorite(favorite: IFavorite): Promise<IFavorite | undefined> {
        try {
            const doc: IFavoriteDocument | null = await FavoriteModel.findOne(favorite);
            return doc ? doc.toJSON() : undefined;
        } catch (e) {
            console.error('FavoriteRepository.getUserFavorite', e);
            throw e;
        }
    }

    public async addUserFavorite(favorite: IFavorite): Promise<IFavorite> {
        try {
            const doc: IFavoriteDocument = await FavoriteModel.create(favorite);
            return doc.toJSON();
        } catch (e) {
            console.error('FavoriteRepository.addUserFavorite', e);
            throw e;
        }
    }

    public async removeUserFavorite(favorite: IFavorite): Promise<void> {
        try {
            await FavoriteModel.deleteOne(favorite);
        } catch (e) {
            console.error('FavoriteRepository.removeUserFavorite', e);
            throw e;
        }
    }
}
