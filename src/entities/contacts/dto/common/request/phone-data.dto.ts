import { IsOptional, IsString, Matches } from 'class-validator';
import { REG_EXP } from '../../../../../lib/constants';
import { PhoneType } from '../types';

export class PhoneDataDTO {
  @IsString()
  @IsOptional()
  public _id: string;

  @IsString()
  @IsOptional()
  @Matches(REG_EXP.phone, {
    message: 'Invalid phone number format',
  })
  public phoneNumber: string;

  @IsString()
  @IsOptional()
  public phoneType?: typeof PhoneType[keyof typeof PhoneType];
}
