import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  WorkDataDTO,
  EmailDataDTO,
  PhoneDataDTO,
  AddressDataDTO,
} from '../common/request';

export class CreateContactRequestDTO {
  @IsString()
  @IsOptional()
  public _id: string;

  @IsString()
  public firstName: string;

  @IsString()
  @IsOptional()
  public lastName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => WorkDataDTO)
  public workData: WorkDataDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => EmailDataDTO)
  public emailData: EmailDataDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => PhoneDataDTO)
  public phoneData: PhoneDataDTO[];

  @IsString()
  @IsOptional()
  public note: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => AddressDataDTO)
  public addressData: AddressDataDTO[];

  @IsString()
  @IsOptional()
  public website: string;
}
