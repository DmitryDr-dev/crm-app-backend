import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { REG_EXP } from '../../../../../lib/constants';
import { EmailType } from '../types';

export class EmailDataDTO {
  @IsString()
  @IsOptional()
  public _id: string;

  @IsString()
  @IsOptional()
  @Matches(REG_EXP.email, {
    message: 'Incorrect email format',
  })
  @IsEmail()
  public emailAddress: string;

  @IsString()
  @IsOptional()
  public emailType: typeof EmailType[keyof typeof EmailType];
}
