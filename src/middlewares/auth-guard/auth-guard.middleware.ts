import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IBaseMiddleware } from '../../common/middleware';
import { AUTH_TYPES } from '../../common/ioc/auth-bindings';
import { USERS_TYPES } from '../../common/ioc/users-bindings';
import { IAuthService } from '../../auth/service';
import { IUsersService } from '../../entities/users/service';
import { HttpError } from '../../app-modules/error/http-error';
import { HttpCode } from '../../lib/constants';
import { JwtPayload } from '../../auth/types';

@injectable()
export class AuthGuard implements IBaseMiddleware {
  constructor(
    @inject(AUTH_TYPES.IAuthService) private authService: IAuthService,
    @inject(USERS_TYPES.IUsersService)
    private userService: IUsersService,
  ) {}

  public async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const token = req.get('Authorization')?.split(' ')[1];

    if (!token) {
      return next(new HttpError(HttpCode.Unauthorized, 'Unauthorized'));
    }

    const isValid = await this.authService.isTokenValid(token);

    if (!isValid) {
      return next(new HttpError(HttpCode.Unauthorized, 'Unauthorized'));
    }

    const payload = jwt.decode(token) as JwtPayload;
    const user = await this.userService.findUserById(payload?.id);

    if (!user || user.token !== token) {
      return next(new HttpError(HttpCode.Unauthorized, 'Unauthorized'));
    }

    res.locals.user = user;

    next();
  }
}
