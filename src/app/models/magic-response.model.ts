export class MagicResponse {
    title: string;
    mainText: string;
    jokeText: string;
    infoText: string;
  
    constructor(
      title: string,
      mainText: string,
      jokeText: string,
      infoText: string,
    );
    constructor(data: Partial<MagicResponse>);
    constructor(
      titleOrData: string | Partial<MagicResponse>,
      mainText?: string,
      jokeText?: string,
      infoText?: string,
    ) {
      if (typeof titleOrData === 'string') {
        this.title = titleOrData;
        this.mainText = mainText || '';
        this.jokeText = jokeText || '';
        this.infoText = infoText || '';
      } else if (titleOrData && typeof titleOrData === 'object') {
        Object.assign(this, titleOrData);
      }
    }
  }