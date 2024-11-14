import {
  IsOptional,
  IsString,
  IsNumber,
  IsNotEmpty,
  isNumber
} from 'class-validator';

export class EditUserDto {
  id: number;

  @IsString()
  @IsOptional()
  name?: string;
}