import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';

export function AuthMiddleware({ headers }: Request, res: Response, next: NextFunction): any {
    if (!headers || !headers.authorization || headers.authorization.length === 0) {
        return res.status(401).json({ message: 'authorization token required' });
    }

    try {
        AuthService.verifyToken(headers.authorization);
    } catch (e) {
        console.error(e);
        return res.status(401).json({ message: 'invalid access token' });
    }

    next();
}
