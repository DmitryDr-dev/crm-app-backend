import { injectable } from 'inversify';
import { ReturnModelType } from '@typegoose/typegoose';
import { IUsersRepository } from './users.repository.interface';
import { User, UserModel } from '../model/user.model';
import { UserDocumentType } from '../model/index';
import { SignUpUserRequestDto } from '../../../auth/dto/signUpUser';

@injectable()
export class UsersRepository implements IUsersRepository {
  private model: ReturnModelType<typeof User>;

  constructor() {
    this.model = UserModel;
  }

  public async createUser(
    body: SignUpUserRequestDto,
  ): Promise<UserDocumentType | null> {
    const result = await this.model.create({ ...body });
    return result;
  }

  public async findByUserByEmail(
    email: string,
  ): Promise<UserDocumentType | null> {
    const result = await this.model.findOne({ email });
    return result;
  }

  public async updateToken(
    id: string,
    token: string | null,
  ): Promise<UserDocumentType | null> {
    const result = await this.model.findOneAndUpdate(
      { _id: id },
      { token },
      { new: true },
    );
    return result;
  }

  public async findUserById(userId: string): Promise<UserDocumentType | null> {
    const result = await this.model.findOne({
      _id: userId,
    });
    return result;
  }
}
