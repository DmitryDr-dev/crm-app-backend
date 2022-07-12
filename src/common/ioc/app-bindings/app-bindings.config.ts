import { ContainerModule, interfaces } from 'inversify';
import { APP_TYPES } from './app-bindings.types';
import { App } from '../../../app';
import { LoggerService, ILoggerService } from '../../../app-modules/logger';
import {
  ErrorHandlerService,
  IErrorHandlerService,
} from '../../../app-modules/error/error-handler';
import {
  MongoDbConnectionService,
  IMongoDbConnectionService,
} from '../../../app-modules/database/mongodb';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(APP_TYPES.App).to(App).inSingletonScope;
  bind<ILoggerService>(APP_TYPES.ILoggerService)
    .to(LoggerService)
    .inSingletonScope();
  bind<IErrorHandlerService>(APP_TYPES.IErrorhandlerService)
    .to(ErrorHandlerService)
    .inSingletonScope();
  bind<IMongoDbConnectionService>(APP_TYPES.IMongoDbConnectionService)
    .to(MongoDbConnectionService)
    .inSingletonScope();
});
