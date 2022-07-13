import { Request, Response, NextFunction } from 'express';
import { ControllerResponseType } from '../../common/types';

export interface IAuthController {
  signUpUser: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;

  loginUser: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;

  logoutpUser: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;
}
