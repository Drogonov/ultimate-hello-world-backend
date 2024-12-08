import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AuthRequestDto, SignUpResponseDto, LogoutResponseDto } from './dto';
import { TokensResponseDto } from 'src/common/dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up with email and password' })
  @ApiCreatedResponse({ description: 'Returns status if successful', type: SignUpResponseDto })
  signupLocal(@Body() dto: AuthRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/verifyotp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify OTP and authenticate user' })
  @ApiOkResponse({ description: 'Returns access and refresh tokens', type: TokensResponseDto })
  verifyOTP(@Body() dto: AuthRequestDto): Promise<TokensResponseDto> {
    return this.authService.verifyOTP(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiOkResponse({ description: 'Returns access and refresh tokens', type: TokensResponseDto })
  signinLocal(@Body() dto: AuthRequestDto): Promise<TokensResponseDto> {
    return this.authService.signinLocal(dto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('refresh-token')
  @ApiOperation({ summary: 'Log out from current session' })
  @ApiOkResponse({ description: 'Returns status if successful', type: LogoutResponseDto })
  logout(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<LogoutResponseDto> {
    return this.authService.logout(userId, refreshToken);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('refresh-token')
  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiOkResponse({ description: 'Returns new access and refresh tokens', type: TokensResponseDto })
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<TokensResponseDto> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
