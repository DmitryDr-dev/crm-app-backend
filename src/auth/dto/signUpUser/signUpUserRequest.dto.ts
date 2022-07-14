import { IsEmail, IsString, Matches } from 'class-validator';
import { REG_EXP } from '../../../lib/constants';

export class SignUpUserRequestDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  @IsEmail()
  @Matches(REG_EXP.email, {
    message: 'Incorrect email format',
  })
  public email: string;

  @IsString()
  public password: string;
}
