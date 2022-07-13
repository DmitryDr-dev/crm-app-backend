import { ContainerModule, interfaces } from 'inversify';
import {
  IUsersRepository,
  UsersRepository,
} from '../../../entities/users/repository';
import { USERS_TYPES } from './users-bindings.types';

export const usersBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUsersRepository>(USERS_TYPES.IUsersRepository)
    .to(UsersRepository)
    .inSingletonScope();
});
