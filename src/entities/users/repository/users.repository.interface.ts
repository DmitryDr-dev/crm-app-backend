import { UserDocumentType } from '../model/index';
import { SignUpUserRequestDto } from '../../../auth/dto/signUpUser';

export interface IUsersRepository {
  createUser: (body: SignUpUserRequestDto) => Promise<UserDocumentType | null>;

  findByUserByEmail: (email: string) => Promise<UserDocumentType | null>;

  updateToken: (
    id: string,
    token: string | null,
  ) => Promise<UserDocumentType | null>;

  findUserById: (userId: string) => Promise<UserDocumentType | null>;
}
