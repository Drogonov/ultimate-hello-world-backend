import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The users email', example: 'test@test.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The users password', example: 'qqqqqqqq' })
  password: string;
}