import { IsOptional, IsString } from 'class-validator';

export class WorkDataDTO {
  @IsString()
  @IsOptional()
  public _id: string;

  @IsString()
  @IsOptional()
  public companyName: string;

  @IsString()
  @IsOptional()
  public department: string;

  @IsString()
  @IsOptional()
  public jobTitle: string;
}
