import { inject, injectable } from 'inversify';
import { UserDocumentType } from '../model';
import { APP_TYPES } from '../../../common/ioc/app-bindings';
import { USERS_TYPES } from '../../../common/ioc/users-bindings';
import { ILoggerService } from '../../../app-modules/logger';
import { IUsersRepository } from '../repository';
import { IUsersService } from './users.service.interface';
import { SignUpUserRequestDto } from '../../../auth/dto/signUpUser';

@injectable()
export class UsersService implements IUsersService {
  constructor(
    @inject(APP_TYPES.ILoggerService) private logger: ILoggerService,
    @inject(USERS_TYPES.IUsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  public async doesUserExist(email: string): Promise<UserDocumentType | null> {
    try {
      const user = await this.usersRepository.findByUserByEmail(email);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[UsersService] An error occurred while fetching user: ${error.message}`,
        );
      } else {
        this.logger.error(
          `[UsersService] An error occurred while fetching user: ${error}`,
        );
      }
      return null;
    }
  }

  public async createUser(
    body: SignUpUserRequestDto,
  ): Promise<UserDocumentType | null> {
    try {
      const user = await this.usersRepository.createUser(body);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[UsersService] An error occurred while creating user: ${error.message}`,
        );
      } else {
        this.logger.error(
          `[UsersService] An error occurred while creating user: ${error}`,
        );
      }
      return null;
    }
  }

  public async isUserValid(
    email: string,
    password: string,
  ): Promise<UserDocumentType | null> {
    try {
      const user = await this.usersRepository.findByUserByEmail(email);
      const isPassValid = await user?.isPasswordValid(password);

      return !isPassValid || !user ? null : user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[UsersService] An error occurred while checking user: ${error.message}`,
        );
      } else {
        this.logger.error(
          `[UsersService] An error occurred while checking user: ${error}`,
        );
      }
      return null;
    }
  }

  public async findUserById(id: string): Promise<UserDocumentType | null> {
    try {
      const user = await this.usersRepository.findUserById(id);

      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[UsersService] An error occurred while fetching user: ${error.message}`,
        );
      } else {
        this.logger.error(
          `[UsersService] An error occurred while fetching user: ${error}`,
        );
      }
      return null;
    }
  }
}
