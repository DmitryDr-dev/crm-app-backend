import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { inject, injectable } from 'inversify';
import { APP_TYPES } from '../../common/ioc/app-bindings';
import { ControllerResponseType } from '../../common/types';
import { BaseController } from '../../common/controller';
import { ILoggerService } from '../../app-modules/logger';
import { IAuthController } from './auth.controller.interface';

@injectable()
export class AuthController extends BaseController implements IAuthController {
  constructor(
    @inject(APP_TYPES.ILoggerService) protected logger: ILoggerService,
  ) {
    super(logger);
  }

  public async signUpUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {}

  public async loginUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {}

  public async logoutpUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {}
}
