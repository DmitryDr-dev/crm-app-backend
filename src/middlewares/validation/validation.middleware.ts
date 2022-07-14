import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { HttpError } from '../../app-modules/error/http-error';
import { HttpCode } from '../../lib/constants';
import { IBaseMiddleware } from '../../common/middleware';

export class ValidationMiddleware implements IBaseMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  public async execute(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const instance = plainToClass(this.classToValidate, req.body);
    const errors = await validate(instance);
    if (errors.length > 0) {
      return next(new HttpError(HttpCode.BadRequest, 'Invalid Format'));
    } else {
      next();
    }
  }
}
