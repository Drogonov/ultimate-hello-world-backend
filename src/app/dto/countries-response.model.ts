import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// MARK: - Project implementation

export interface ICountryResponse {
  name: string;
  languageName: string;
  languageCode: string;
  emoji: string;
  isCurrent: boolean;
}

export interface ICountriesResponse {
  title: string;
  countries: ICountryResponse[];
}

// MARK: - Swagger class

export class CountryResponseDto implements ICountryResponse {
  @ApiProperty({ example: 'United States' })
  name: string;

  @ApiProperty({ example: 'English' })
  languageName: string;

  @ApiProperty({ example: 'en' })
  languageCode: string;

  @ApiProperty({ example: '🇺🇸' })
  emoji: string;

  @ApiProperty({ example: true })
  isCurrent: boolean;
}

export class CountriesResponseDto implements ICountriesResponse {
  @ApiProperty({ example: 'Available Countries' })
  title: string;

  @ApiProperty({ type: [CountryResponseDto] })
  countries: CountryResponseDto[];
}