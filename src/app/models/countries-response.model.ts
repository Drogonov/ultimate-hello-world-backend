import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// MARK: - Project implementation

export interface ICountry {
  name: string;
  languageName: string;
  languageCode: string;
  emoji: string;
  isCurrent: boolean;
}

export interface ICountriesResponse {
  title: string;
  countries: ICountry[];
}

// MARK: - Swagger class

export class CountryDto implements ICountry {
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

  @ApiProperty({ type: [CountryDto] })
  countries: CountryDto[];
}