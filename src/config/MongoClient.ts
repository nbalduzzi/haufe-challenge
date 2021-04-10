import { Mongoose, connect } from 'mongoose';

export class Mongo {
    private static connection: Mongoose;

    public static async connect(): Promise<void> {
        if (!Mongo.connection) {
            Mongo.connection = await connect(process.env.MONGODB_URI!, {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });
        }
    }
}
