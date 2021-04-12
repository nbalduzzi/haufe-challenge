import { Schema } from 'mongoose';

const FavoriteSchema: Schema = new Schema(
    {
        userId: String,
        characterId: String,
    },
    {
        toJSON: {
            transform: (_: any, ret: any) => {
                delete ret._id;
                delete ret.__v;
            },
        },
    },
);

export default FavoriteSchema;
