export class InfoResponse {
    title: string;
    imageUrl: string;
    text: string;
    buttonTitle: string;
    deeplink: string;
  
    constructor(
      title: string,
      imageUrl: string,
      text: string,
      buttonTitle: string,
      deeplink: string,
    );
    constructor(data: Partial<InfoResponse>);
    constructor(
      titleOrData: string | Partial<InfoResponse>,
      imageUrl?: string,
      text?: string,
      buttonTitle?: string,
      deeplink?: string,
    ) {
      if (typeof titleOrData === 'string') {
        this.title = titleOrData;
        this.imageUrl = imageUrl || '';
        this.text = text || '';
        this.buttonTitle = buttonTitle || '';
        this.deeplink = deeplink || '';
      } else if (titleOrData && typeof titleOrData === 'object') {
        Object.assign(this, titleOrData);
      }
    }
  }