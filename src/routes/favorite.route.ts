import { Router, Request, Response } from 'express';
import FavoriteController from '../controllers/favorites.controller';

const router: Router = Router();

router.put('/:characterId', async ({ headers, params }: Request, res: Response) => {
    try {
        return res
            .status(200)
            .json(await new FavoriteController(headers.authorization!).addUserFavorite(params.characterId));
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }
});

router.delete('/:characterId', async ({ headers, params }: Request, res: Response) => {
    try {
        return res
            .status(200)
            .json(await new FavoriteController(headers.authorization!).removeUserFavorite(params.characterId));
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }
});

router.get('/', async ({ headers }: Request, res: Response) => {
    try {
        return res.status(200).json(await new FavoriteController(headers.authorization!).getUserFavorites());
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }
});

export default router;
