import { IsEmail, IsString, Matches } from 'class-validator';
import { REG_EXP } from '../../../lib/constants';

export class LogInUserRequestDto {
  @IsString()
  @IsEmail()
  @Matches(REG_EXP.email, {
    message: 'Incorrect email format',
  })
  public email: string;

  @IsString()
  public password: string;
}
