import { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
    {
        userId: String,
        username: {
            type: String,
            unique: true,
        },
        password: String,
        status: String,
        lastConnection: Number,
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

export default UserSchema;
