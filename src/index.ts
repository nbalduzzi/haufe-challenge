import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { serve, setup } from 'swagger-ui-express';

import Router from './routes';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT: number = process.env.PORT ? +process.env.PORT : 3001;

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(compression());
app.use(helmet());
app.use(cors());

// Routes
app.use(Router);

// Documentation
if (process.env.NODE_ENV === 'development') {
    app.use('/api', serve, setup(undefined, { swaggerOptions: { url: '/swagger.json' } }));
}

mongoose
    .connect(process.env.MONGODB_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.MONGODB_USER,
        pass: process.env.MONGODB_PASSWORD,
        dbName: process.env.MONGODB_DBNAME,
    })
    .then(() => app.listen(PORT, '0.0.0.0', () => console.info('API listening on port', PORT)))
    .catch((e: Error) => console.error(e));
