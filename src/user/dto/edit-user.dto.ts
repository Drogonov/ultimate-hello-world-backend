import {
  IsOptional,
  IsString,
  IsNumber,
  IsNotEmpty
} from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}