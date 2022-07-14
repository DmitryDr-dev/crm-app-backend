import { UserDocumentType } from '../model';
import { SignUpUserRequestDto } from '../../../auth/dto/signUpUser';

export interface IUsersService {
  doesUserExist: (email: string) => Promise<UserDocumentType | null>;

  createUser: (body: SignUpUserRequestDto) => Promise<UserDocumentType | null>;

  isUserValid: (
    email: string,
    password: string,
  ) => Promise<UserDocumentType | null>;

  findUserById: (id: string) => Promise<UserDocumentType | null>;
}
