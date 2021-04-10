import { Model, model } from 'mongoose';
import FavoriteSchema from './favorites.schema';
import { IFavoriteDocument } from './favorites.types';

export const FavoriteModel: Model<IFavoriteDocument> = model<IFavoriteDocument>('favorite', FavoriteSchema);
