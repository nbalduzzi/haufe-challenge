import { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
    {
        userId: String,
        username: String,
        password: String,
        status: String,
        lastConnection: Number,
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

export default UserSchema;
