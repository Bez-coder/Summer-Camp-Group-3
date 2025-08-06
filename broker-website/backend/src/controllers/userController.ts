import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
  // Placeholder: fetch users from DB
  res.json([{ id: 1, name: 'Test User' }]);
};
