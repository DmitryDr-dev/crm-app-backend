import { ContainerModule, interfaces } from 'inversify';
import { AUTH_TYPES } from './auth-bindings.types';
import { AuthController, IAuthController } from '../../../auth/controller';
import { AuthService, IAuthService } from '../../../auth/service';
import { AuthGuard } from '../../../middlewares/auth-guard';
import { IBaseMiddleware } from '../../middleware';

export const authBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAuthController>(AUTH_TYPES.IAuthController)
    .to(AuthController)
    .inSingletonScope();
  bind<IAuthService>(AUTH_TYPES.IAuthService)
    .to(AuthService)
    .inSingletonScope();
  bind<IBaseMiddleware>(AUTH_TYPES.AuthGuard).to(AuthGuard).inSingletonScope();
});
