export class HelloResponse {
    title: string;
    text: string;
    emoji: string;
    buttonTitle: string;

    constructor(title: string, text: string, emoji: string, buttonTitle: string);
    constructor(data: Partial<HelloResponse>);
    constructor(titleOrData: string | Partial<HelloResponse>, text?: string, emoji?: string, buttonTitle?: string) {
        if (typeof titleOrData === 'string') {
            // Handle the direct argument-based initialization
            this.title = titleOrData;
            this.text = text || '';
            this.emoji = emoji || '';
            this.buttonTitle = buttonTitle || '';
        } else if (titleOrData && typeof titleOrData === 'object') {
            // Handle the object-based initialization
            Object.assign(this, titleOrData);
        }
    }
}