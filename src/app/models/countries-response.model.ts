export interface ICountriesResponse {
  title: string;
  countries: ICountry[];
}

export interface ICountry {
  name: string;
  languageName: string;
  languageCode: string;
  emoji: string;
  isCurrent: boolean;
}
