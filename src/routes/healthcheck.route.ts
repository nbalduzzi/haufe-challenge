import { Router, Request, Response } from 'express';
import HealthCheckController from '../controllers/healthcheck.controller';

const router: Router = Router();

router.get('/', async (_: Request, res: Response) => res.json(await new HealthCheckController().getPong()));

export default router;
