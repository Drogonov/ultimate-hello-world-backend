import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LanguageCodeRequestDto } from './dto';
import { HelloResponseDto, CountriesResponseDto, InfoResponseDto, MagicResponseDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';

@ApiTags('App')
@ApiBearerAuth('access-token')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('hello')
  @ApiOperation({ summary: 'Get Hello response' })
  @ApiOkResponse({ description: 'Returns a greeting', type: HelloResponseDto })
  getHello(@Body() dto: LanguageCodeRequestDto): Promise<HelloResponseDto> {
    return this.appService.getHello(dto.languageCode);
  }

  @Post('countries')
  @ApiOperation({ summary: 'Get list of countries' })
  @ApiOkResponse({ description: 'Returns a list of countries', type: CountriesResponseDto })
  getCountries(@Body() dto: LanguageCodeRequestDto): Promise<CountriesResponseDto> {
    return this.appService.getCountries(dto.languageCode);
  }

  @Post('info')
  @ApiOperation({ summary: 'Get information' })
  @ApiOkResponse({ description: 'Returns detailed information', type: InfoResponseDto })
  getInfo(@Body() dto: LanguageCodeRequestDto): Promise<InfoResponseDto> {
    return this.appService.getInfo(dto.languageCode);
  }

  @Post('magic')
  @ApiOperation({ summary: 'Get magic response' })
  @ApiOkResponse({ description: 'Returns a magical response', type: MagicResponseDto })
  getMagic(@Body() dto: LanguageCodeRequestDto): Promise<MagicResponseDto> {
    return this.appService.getMagic(dto.languageCode);
  }
}