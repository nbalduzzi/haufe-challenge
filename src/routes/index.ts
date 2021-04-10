import { Router } from 'express';

import { AuthMiddleware } from '../middlewares';
import HealthCheckRoute from './healthcheck.route';
import AuthRoute from './auth.route';
import CharacterRoute from './character.route';
import FavoriteRoute from './favorite.route';

const router: Router = Router();

// Security
router.use(['/characters', '/favorites'], AuthMiddleware);
// Endpoints
router.use('/ping', HealthCheckRoute);
router.use('/auth', AuthRoute);
router.use('/characters', CharacterRoute);
router.use('/favorites', FavoriteRoute);

export default router;
