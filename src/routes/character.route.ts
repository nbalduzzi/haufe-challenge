import { Router, Request, Response } from 'express';
import CharacterController from '../controllers/character.controller';

const router: Router = Router();

router.get('/', async ({ headers, query }: Request, res: Response) => {
    try {
        return res
            .status(200)
            .json(await new CharacterController(headers.authorization!).getPagedCharacters(query['page']!.toString()));
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }
});

router.get('/:id', async ({ headers, params }: Request, res: Response) => {
    try {
        return res.status(200).json(await new CharacterController(headers.authorization!).getCharacterById(params.id));
    } catch (e) {
        return res.status(e.statusCode).json(e);
    }
});

export default router;
