import { Request, Response, NextFunction } from 'express';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  // TODO: Implement JWT authentication
  // For now, mock user
  req.user = { id: 1 };
  next();
}
