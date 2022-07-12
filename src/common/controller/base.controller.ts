import { Router } from 'express';
import { injectable } from 'inversify';
import { IBaseRoute } from '../route';
import { ILoggerService } from '../../app-modules/logger';

@injectable()
export abstract class BaseController {
  private _router: Router;
  protected logger: ILoggerService;

  constructor(logger: ILoggerService) {
    this._router = Router();
    this.logger = logger;
  }

  public get router(): Router {
    return this._router;
  }

  protected createRoutes(routes: IBaseRoute[]): void {
    for (const route of routes) {
      const { method, path, func } = route;
      const middlewares = route?.middlewares?.map((middleware) =>
        middleware.execute.bind(middleware),
      );
      const boundFunc = func.bind(this);
      const pipeline = middlewares ? [...middlewares, boundFunc] : boundFunc;

      this.router[method](path, pipeline);
    }
  }
}
