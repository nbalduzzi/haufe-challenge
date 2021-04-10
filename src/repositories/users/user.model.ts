import { Model, model } from 'mongoose';
import UserSchema from './user.schema';
import { IUserDocument } from './user.types';

export const UserModel: Model<IUserDocument> = model<IUserDocument>('user', UserSchema);
