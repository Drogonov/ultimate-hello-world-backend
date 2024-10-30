import {
  IsNotEmpty,
  IsString,
  IsNumber
} from 'class-validator';

export class AuthUserDto {
  @IsString()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}