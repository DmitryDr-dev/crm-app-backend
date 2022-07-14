import { ContainerModule, interfaces } from 'inversify';
import { USERS_TYPES } from './users-bindings.types';
import {
  UsersRepository,
  IUsersRepository,
} from '../../../entities/users/repository';
import { UsersService, IUsersService } from '../../../entities/users/service';

export const usersBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUsersRepository>(USERS_TYPES.IUsersRepository)
    .to(UsersRepository)
    .inSingletonScope();
  bind<IUsersService>(USERS_TYPES.IUsersService)
    .to(UsersService)
    .inSingletonScope();
});
