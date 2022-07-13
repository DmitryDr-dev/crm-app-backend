import { ContainerModule, interfaces } from 'inversify';
import { AuthController, IAuthController } from '../../../auth/controller';
import { AUTH_TYPES } from './auth-bindings.types';

export const authBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAuthController>(AUTH_TYPES.IAuthController)
    .to(AuthController)
    .inSingletonScope();
});
