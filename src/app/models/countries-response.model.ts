export class CountriesResponse {
  title: string;
  countries: Country[];

  constructor(title: string, countries: Country[]);
  constructor(data: Partial<CountriesResponse>);
  constructor(
    titleOrData: string | Partial<CountriesResponse>,
    countries?: Country[],
  ) {
    if (typeof titleOrData === 'string') {
      this.title = titleOrData;
      this.countries = countries || [];
    } else if (titleOrData && typeof titleOrData === 'object') {
      this.title = titleOrData.title || '';
      this.countries = (titleOrData.countries || []).map(
        (country) => new Country(country),
      );
    }
  }
}

export class Country {
  name: string;
  languageName: string;
  languageCode: string;
  emoji: string;
  isCurrent: boolean;

  constructor(
    name: string,
    languageName: string,
    languageCode: string,
    emoji: string,
    isCurrent: boolean,
  );
  constructor(data: Partial<Country>);
  constructor(
    nameOrData: string | Partial<Country>,
    languageName?: string,
    languageCode?: string,
    emoji?: string,
    isCurrent?: boolean,
  ) {
    if (typeof nameOrData === 'string') {
      this.name = nameOrData;
      this.languageName = languageName || '';
      this.languageCode = languageCode || '';
      this.emoji = emoji || '';
      this.isCurrent = isCurrent || false;
    } else if (nameOrData && typeof nameOrData === 'object') {
      Object.assign(this, nameOrData);
    }
  }
}