import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/users.interfaces';

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
