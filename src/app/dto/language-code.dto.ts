import { IsString } from 'class-validator';

export class LanguageCodeDto {
  @IsString()
  languageCode: string;
}