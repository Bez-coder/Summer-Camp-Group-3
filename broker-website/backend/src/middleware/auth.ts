import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  const payload = verifyJwt(token);
  if (!payload || typeof payload !== 'object' || !('id' in payload)) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  (req as any).user = payload;
  next();
}
