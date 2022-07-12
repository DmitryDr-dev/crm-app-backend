import { ContainerModule, interfaces } from 'inversify';
import { APP_TYPES } from './app-bindings.types';
import { App } from '../../../app';
import { LoggerService, ILoggerService } from '../../../app-modules/logger';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(APP_TYPES.App).to(App).inSingletonScope;
  bind<ILoggerService>(APP_TYPES.ILoggerService)
    .to(LoggerService)
    .inSingletonScope();
});
