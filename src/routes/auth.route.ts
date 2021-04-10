import { Router, Request, Response } from 'express';
import AuthController from '../controllers/auth.controller';

const router: Router = Router();

router.post('/login', async ({ body }: Request, res: Response) => {
    try {
        return res.status(200).json(await new AuthController().login(body));
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }
});

router.post('/register', async ({ body }: Request, res: Response) => {
    try {
        return res.status(201).json(await new AuthController().register(body));
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }
});

export default router;
