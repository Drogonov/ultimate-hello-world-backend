import {
  IsNotEmpty,
  IsString,
  IsNumber
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}