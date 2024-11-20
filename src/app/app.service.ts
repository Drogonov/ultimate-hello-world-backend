import { Injectable } from '@nestjs/common';
import { CountriesResponse, HelloResponse, InfoResponse, MagicResponse } from './models';

@Injectable()
export class AppService {

    async getHello(languageCode: string): Promise<HelloResponse> {
        return new HelloResponse({
            title: 'Say Hello',
            text: 'Hello World',
            emoji: '🏴',
            buttonTitle: 'More Info',
        });
    }

    async getCountries(languageCode: string): Promise<CountriesResponse> {
        return new CountriesResponse({
            title: 'Change Countries',
            countries: [
                {
                    name: 'England',
                    languageName: 'english',
                    languageCode: 'en',
                    emoji: '🏴',
                    isCurrent: true
                },
                {
                    name: 'Russia',
                    languageName: 'russian',
                    languageCode: 'ru',
                    emoji: '🇷🇺',
                    isCurrent: false
                },
                {
                    name: 'Japan',
                    languageName: 'japanese',
                    languageCode: 'ja',
                    emoji: '🇯🇵',
                    isCurrent: false
                }
            ]
        });
    }

    async getInfo(languageCode: string): Promise<InfoResponse> {
        return new InfoResponse({
            title: "More Info",
            imageUrl: "https://picsum.photos/200/300",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            buttonTitle: "Open Magic Screen",
            deeplink: "https://helloworldapp.com/magic?languageCode=EN"
        });
    }

    async getMagic(languageCode: string): Promise<MagicResponse> {
        return new MagicResponse({
            title: "Magic seriously?",
            mainText: "Bro you are holding subject which is made from iron and dead dino bodies and it gives you almost all info what humanity collected till this moment It is not a Magic it is proof of existence of",
            jokeText: "DEUS EX MACHINA",
            infoText: "Have a nice day and check how deeplinks work"
        });
    }
}