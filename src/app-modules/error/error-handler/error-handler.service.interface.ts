import { Request, Response, NextFunction } from 'express';

export interface IErrorHandlerService {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
