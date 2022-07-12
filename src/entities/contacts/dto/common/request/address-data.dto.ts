import { IsOptional, IsString } from 'class-validator';

export class AddressDataDTO {
  @IsString()
  @IsOptional()
  public _id: string;

  @IsString()
  @IsOptional()
  public address: string;

  @IsString()
  @IsOptional()
  public city: string;

  @IsString()
  @IsOptional()
  public region: string;

  @IsString()
  @IsOptional()
  public country: string;

  @IsString()
  @IsOptional()
  public zip: string;
}
