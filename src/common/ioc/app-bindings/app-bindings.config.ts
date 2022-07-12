import { ContainerModule, interfaces } from 'inversify';
import { APP_TYPES } from './app-bindings.types';
import { App } from '../../../app';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(APP_TYPES.App).to(App).inSingletonScope;
});
