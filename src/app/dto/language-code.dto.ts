import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LanguageCodeDto {
  @IsString()
  @ApiProperty({ description: 'The language code for the request', example: 'en' })
  languageCode: string;
}