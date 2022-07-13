import { ReturnModelType } from '@typegoose/typegoose';
import { User, UserModel } from '../model/user.model';

export class UsersRepository {
  private model: ReturnModelType<typeof User>;

  constructor() {
    this.model = UserModel;
  }
}
