export interface IHelloResponse {
    title: string;
    text?: string;
    emoji?: string;
    buttonTitle?: string;
}

export const createHelloResponse = (helloData: IHelloResponse): IHelloResponse => {
    const response: IHelloResponse = {
        title: helloData.title,
        text: helloData.text ?? 'How are you?',
        emoji: helloData.emoji ?? '👋',
        buttonTitle: helloData.buttonTitle ?? 'Say hello back',
    }
    return response;
}