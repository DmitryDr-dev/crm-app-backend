import jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import { USERS_TYPES } from '../../common/ioc/users-bindings';
import { APP_TYPES } from '../../common/ioc/app-bindings';
import { IUsersRepository } from '../../entities/users/repository';
import { IAuthService } from './auth.service.interface';
import { ILoggerService } from '../../app-modules/logger';
import { UserDocumentType } from '../../entities/users/model';
import { JwtPayload } from '../types';

@injectable()
export class AuthService implements IAuthService {
  #secretKey: string | undefined;

  constructor(
    @inject(APP_TYPES.ILoggerService) private logger: ILoggerService,
    @inject(USERS_TYPES.IUsersRepository)
    private usersRepository: IUsersRepository,
  ) {
    this.#secretKey = process.env.JWT_SECRET_KEY;
  }

  public async getToken(user: UserDocumentType): Promise<string | null> {
    const { id, email } = user;
    const payload: JwtPayload = { id, email };

    if (this.#secretKey) {
      const token = jwt.sign(payload, this.#secretKey, { expiresIn: '8h' });
      return token;
    } else {
      this.logger.error(`[AuthService] An error occurred on reading JWT key`);
      return null;
    }
  }

  public async setToken(
    id: string,
    token: string | null,
  ): Promise<UserDocumentType | null> {
    try {
      const result = await this.usersRepository.updateToken(id, token);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[AuthService] An error occurred while creating user: ${error.message}`,
        );
      } else {
        this.logger.error(
          `[AuthService] An error occurred while creating user: ${error}`,
        );
      }
      return null;
    }
  }

  public async isTokenValid(token: string): Promise<boolean | null> {
    if (this.#secretKey) {
      try {
        const result = jwt.verify(token, this.#secretKey);
        return !!result;
      } catch (error) {
        return false;
      }
    } else {
      this.logger.error(`[AuthService] An error occurred on reading JWT key`);
      return null;
    }
  }
}
