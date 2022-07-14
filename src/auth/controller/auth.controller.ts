import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HttpError } from '../../app-modules/error/http-error';
import { ILoggerService } from '../../app-modules/logger';
import { BaseController } from '../../common/controller';
import { APP_TYPES } from '../../common/ioc/app-bindings';
import { AUTH_TYPES } from '../../common/ioc/auth-bindings';
import { USERS_TYPES } from '../../common/ioc/users-bindings';
import { IBaseMiddleware } from '../../common/middleware';
import { ControllerResponseType } from '../../common/types';
import { IUsersService } from '../../entities/users/service';
import { HttpCode } from '../../lib/constants';
import { ValidationMiddleware } from '../../middlewares/validation';
import { LogInUserRequestDto, LogInUserResponseDto } from '../dto/logInUser';
import { SignUpUserRequestDto, SignUpUserResponseDto } from '../dto/signUpUser';
import { AuthMap } from '../map';
import { IAuthService } from '../service';
import { IAuthController } from './auth.controller.interface';

@injectable()
export class AuthController extends BaseController implements IAuthController {
  constructor(
    @inject(APP_TYPES.ILoggerService) protected logger: ILoggerService,
    @inject(USERS_TYPES.IUsersService) protected usersService: IUsersService,
    @inject(AUTH_TYPES.IAuthService) protected authService: IAuthService,
    @inject(AUTH_TYPES.AuthGuard) protected guard: IBaseMiddleware,
  ) {
    super(logger);

    this.createRoutes([
      {
        path: '/signup',
        method: 'post',
        middlewares: [new ValidationMiddleware(SignUpUserRequestDto)],
        func: this.signUpUser,
      },
      {
        path: '/login',
        method: 'post',
        middlewares: [new ValidationMiddleware(LogInUserRequestDto)],
        func: this.logInUser,
      },
      {
        path: '/logout',
        method: 'post',
        middlewares: [this.guard],
        func: this.logOutUser,
      },
    ]);
  }

  public async signUpUser(
    req: Request<{}, {}, SignUpUserRequestDto>,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const result = await this.usersService.doesUserExist(req.body.email);

    if (result) {
      return next(new HttpError(HttpCode.Conflict, 'Email in Use'));
    }

    const user = await this.usersService.createUser(req.body);

    if (!user) {
      return next(new HttpError(HttpCode.BadRequest, 'Bad Request'));
    }

    const dto: SignUpUserResponseDto = AuthMap.toSignUpUserResponseDto(user);
    return res.status(HttpCode.Created).json({
      data: dto,
    });
  }

  public async logInUser(
    req: Request<{}, {}, LogInUserRequestDto>,
    res: Response,
    next: NextFunction,
  ): ControllerResponseType {
    const { email, password } = req.body;
    const user = await this.usersService.isUserValid(email, password);

    if (!user) {
      return next(new HttpError(HttpCode.Unauthorized, 'Invalid Credentials'));
    }
    const token = await this.authService.getToken(user);

    if (!token) {
      return next(new HttpError(HttpCode.BadRequest, 'Bad Request'));
    }
    await this.authService.setToken(user.id, token);

    const dto: LogInUserResponseDto = AuthMap.toLogInUserResponseDto(
      token,
      user,
    );
    return res.status(HttpCode.Ok).json({
      data: dto,
    });
  }

  public async logOutUser(
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): ControllerResponseType {
    const { id } = res.locals.user;
    await this.authService.setToken(id, null);
    return res.status(HttpCode.Ok);
  }
}
