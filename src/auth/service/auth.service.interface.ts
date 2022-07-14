import { UserDocumentType } from '../../entities/users/model';

export interface IAuthService {
  getToken: (user: UserDocumentType) => Promise<string | null>;

  setToken: (
    id: string,
    token: string | null,
  ) => Promise<UserDocumentType | null>;

  isTokenValid: (token: string) => Promise<boolean | null>;
}
