import { Schema, model, Document } from 'mongoose';

export interface FavoriteDocument extends Document {
    userId: string;
    characterId: string;
}

const schema: Schema<FavoriteDocument> = new Schema(
    {
        userId: String,
        characterId: String,
    },
    {
        toJSON: {
            transform: (ret: any) => {
                delete ret._id;
                delete ret.__v;
            },
        },
    },
);

export default model('Favorite', schema);
