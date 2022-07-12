import { Request, Response, NextFunction } from 'express';

export interface IBaseMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
