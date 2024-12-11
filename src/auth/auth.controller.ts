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
import { AuthRequestDto, StatusResponseDto } from './dto';
import { ErrorResponseDto, TokensResponseDto } from 'src/common/dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signUp')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up with email and password' })
  @ApiOkResponse({ description: 'Returns status if successful', type: StatusResponseDto })
  @ApiUnprocessableEntityResponse({ description: 'Returns business top layer error', type: ErrorResponseDto })
  signupLocal(@Body() dto: AuthRequestDto): Promise<StatusResponseDto> {
    return this.authService.signUpLocal(dto);
  }

  @Public()
  @Post('local/verifyOTP')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify OTP and authenticate user' })
  @ApiOkResponse({ description: 'Returns access and refresh tokens', type: TokensResponseDto })
  @ApiUnprocessableEntityResponse({ description: 'Returns business top layer error', type: ErrorResponseDto })
  verifyOTP(@Body() dto: AuthRequestDto): Promise<TokensResponseDto> {
    return this.authService.verifyOTP(dto);
  }

  @Public()
  @Post('local/resendOTP')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend OTP and update it for user' })
  @ApiOkResponse({ description: 'Returns operation status', type: StatusResponseDto })
  @ApiUnprocessableEntityResponse({ description: 'Returns business top layer error', type: ErrorResponseDto })
  resendOTP(@Body() dto: AuthRequestDto): Promise<StatusResponseDto> {
    return this.authService.resendOTP(dto);
  }

  @Public()
  @Post('local/signIn')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiOkResponse({ description: 'Returns access and refresh tokens', type: TokensResponseDto })
  @ApiUnprocessableEntityResponse({ description: 'Returns business top layer error', type: ErrorResponseDto })
  signinLocal(@Body() dto: AuthRequestDto): Promise<TokensResponseDto> {
    return this.authService.signInLocal(dto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('refresh-token')
  @ApiOperation({ summary: 'Log out from current session' })
  @ApiOkResponse({ description: 'Returns status if successful', type: StatusResponseDto })
  @ApiUnprocessableEntityResponse({ description: 'Returns business top layer error', type: ErrorResponseDto })
  logout(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<StatusResponseDto> {
    return this.authService.logout(userId, refreshToken);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('refresh-token')
  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiOkResponse({ description: 'Returns new access and refresh tokens', type: TokensResponseDto })
  @ApiUnprocessableEntityResponse({ description: 'Returns business top layer error', type: ErrorResponseDto })
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<TokensResponseDto> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
