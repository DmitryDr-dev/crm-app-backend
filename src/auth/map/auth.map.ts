import { UserDocumentType } from '../../entities/users/model';
import { SignUpUserResponseDto } from '../dto/signUpUser';
import { LogInUserResponseDto } from '../dto/logInUser';

export class AuthMap {
  public static toSignUpUserResponseDto(
    user: UserDocumentType,
  ): SignUpUserResponseDto {
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  public static toLogInUserResponseDto(
    token: string,
    user: UserDocumentType,
  ): LogInUserResponseDto {
    return {
      id: user._id,
      email: user.email,
      token: token,
    };
  }
}
