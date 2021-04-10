import { Document, Model } from 'mongoose';
import { IFavorite } from '../../interfaces/favorites.interfaces';

export interface IFavoriteDocument extends IFavorite, Document {}
export interface IFavoriteModel extends Model<IFavoriteDocument> {}
