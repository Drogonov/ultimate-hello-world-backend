import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { LanguageCodeDto } from './dto';
import { ICountriesResponse, IHelloResponse, IInfoResponse, IMagicResponse } from './models';
import { Public } from 'src/common/decorators';

@Controller('app')
export class AppController {
  constructor(
    private appService: AppService
  ) {}

  @Post('hello')
  getHello(@Body() dto: LanguageCodeDto): Promise<IHelloResponse> {
    return this.appService.getHello(dto.languageCode);
  }

  @Post('countries')
  getCountries(@Body() dto: LanguageCodeDto): Promise<ICountriesResponse> {
    return this.appService.getCountries(dto.languageCode);
  }

  @Post('info')
  getInfo(@Body() dto: LanguageCodeDto): Promise<IInfoResponse> {
    return this.appService.getInfo(dto.languageCode);
  }

  @Post('magic')
  getMagic(@Body() dto: LanguageCodeDto): Promise<IMagicResponse> {
    return this.appService.getMagic(dto.languageCode);
  }
}