import { Router, Request, Response, NextFunction } from 'express';
import { ControllerResponseType } from '../types';
import { IBaseMiddleware } from '../middleware';

export interface IBaseRoute {
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>;
  path: string;
  middlewares?: IBaseMiddleware[];
  func: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;
}
