import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { APP_TYPES } from '../../../common/ioc/app-bindings';
import { IErrorHandlerService } from './error-handler.service.interface';
import { ILoggerService } from '../../logger';
import { HttpError } from '../http-error';
import { HttpCode, ResponseStatus } from '../../../lib/constants';

@injectable()
export class ErrorHandlerService implements IErrorHandlerService {
  constructor(
    @inject(APP_TYPES.ILoggerService) private logger: ILoggerService,
  ) {}

  public catch(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): void {
    if (err instanceof HttpError) {
      const { statusCode, message } = err;

      this.logger.error(`${statusCode}: ${message}`);

      res.status(statusCode).json({
        status: ResponseStatus.Error,
        code: statusCode,
        message: message,
      });
    } else {
      const { name, message } = err;

      this.logger.error(
        `[${name}] ${HttpCode.InternalServerError}: ${message}`,
      );

      res.status(HttpCode.InternalServerError).json({
        status: ResponseStatus.Error,
        code: HttpCode.InternalServerError,
        message: message,
      });
    }
  }
}
