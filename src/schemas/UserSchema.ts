import { Schema, model } from 'mongoose';

const schema: Schema = new Schema({
    id: String,
    username: String,
    password: String,
    status: String,
    lastConnection: Number,
});

export default model('User', schema);
