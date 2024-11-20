import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { LanguageCodeDto } from './dto';
import { CountriesResponse, HelloResponse, InfoResponse, MagicResponse } from './models';
import { Public } from 'src/common/decorators';

@Controller('app')
export class AppController {
  constructor(
    private appService: AppService
  ) {}

  @Post('hello')
  getHello(@Body() dto: LanguageCodeDto): Promise<HelloResponse> {
    return this.appService.getHello(dto.languageCode);
  }

  @Post('countries')
  getCountries(@Body() dto: LanguageCodeDto): Promise<CountriesResponse> {
    return this.appService.getCountries(dto.languageCode);
  }

  @Post('info')
  getInfo(@Body() dto: LanguageCodeDto): Promise<InfoResponse> {
    return this.appService.getInfo(dto.languageCode);
  }

  @Post('magic')
  getMagic(@Body() dto: LanguageCodeDto): Promise<MagicResponse> {
    return this.appService.getMagic(dto.languageCode);
  }
}