import { Request, Response, NextFunction } from 'express';
import { ControllerResponseType } from '../../common/types';

export interface IAuthController {
  signUpUser: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;

  logInUser: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;

  logOutUser: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => ControllerResponseType;
}
