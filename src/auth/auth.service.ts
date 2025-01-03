import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthRequestDto, IStatusResponse, StatusResponseDto } from './dto';
import { ITokensResponse } from 'src/common/dto';
import { JWTSessionService } from 'src/jwt-session/jwt-session.service';
import { MailService } from 'src/mail/mail.service';
import { BusinessErrorException, ErrorSubCodes } from 'src/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtSessionService: JWTSessionService,
    private mailService: MailService
  ) { }

  async signUpLocal(dto: AuthRequestDto): Promise<IStatusResponse> {
    const hash = await argon.hash(dto.password);
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedOtp = await argon.hash(otp)

    let user: User;

    try {
      user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          otpHash: hashedOtp,
          isVerificated: false
        },
      });

      await this.mailService.sendOtpEmail(dto.email, otp);

      return { status: "success" };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BusinessErrorException({
          errorSubCode: ErrorSubCodes.USER_ALREADY_EXIST,
          errorFields: [{
            fieldCode: "email",
            errorMsg: "Email is already registered, please sign in."
          }]
        });
      }
      throw error;
    }
  }

  async verifyOTP(dto: AuthRequestDto): Promise<ITokensResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !await argon.verify(user.otpHash, dto.password)) {
      throw new BusinessErrorException({
        errorSubCode: ErrorSubCodes.INCORRECT_OTP,
        errorMsg: "Incorrect OTP pls try again"
      });
    }

    await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        otpHash: null,
        isVerificated: true
      },
    });

    const tokens = await this._getNewSessionTokens(user);
    return tokens;
  }

  async resendOTP(dto: AuthRequestDto): Promise<StatusResponseDto> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedOtp = await argon.hash(otp)

    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      const passwordMatches = await argon.verify(user.hash, dto.password);
      if (!passwordMatches) throw new BusinessErrorException({
        errorSubCode: ErrorSubCodes.INCORRECT_PASSWORD,
        errorFields: [{
          fieldCode: "password",
          errorMsg: "Incorrect password"
        }]
      });

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          otpHash: hashedOtp,
          isVerificated: false
        },
      });

      await this.mailService.sendOtpEmail(dto.email, otp);

      return { status: "success" };
    } catch (error) {
      throw error;
    }
  }

  async signInLocal(dto: AuthRequestDto): Promise<ITokensResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: { sessions: true }
    });

    if (!user) throw new BusinessErrorException({
      errorSubCode: ErrorSubCodes.USER_DOESNT_EXIST,
      errorFields: [{
        fieldCode: "email",
        errorMsg: "Cant find such user"
      }]
    });

    if (user.isVerificated == false) throw new BusinessErrorException({
      errorSubCode: ErrorSubCodes.USER_NOT_VERIFIED,
      errorMsg: "You need to continue registration. Send you a verification password by email?"
    });

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) throw new BusinessErrorException({
      errorSubCode: ErrorSubCodes.INCORRECT_PASSWORD,
      errorFields: [{
        fieldCode: "password",
        errorMsg: "Incorrect password"
      }]
    });

    const tokens = await this._getNewSessionTokens(user);
    return tokens;
  }

  async logout(userId: number, rt: string): Promise<IStatusResponse> {    
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { sessions: true }
    });
    await this.jwtSessionService.endSession(user, rt);

    return { status: "success" };
  }

  async refreshTokens(userId: number, rt: string): Promise<ITokensResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { sessions: true }
    });
    if (!user || !user.sessions) throw new ForbiddenException('Session Expired');

    await this.jwtSessionService.verifyRtMatch(user, rt);

    const tokens = await this.jwtSessionService.getTokens(user.id, user.email);
    await this.jwtSessionService.updateRtHash(user, rt, tokens.refresh_token);

    return tokens;
  }

  // MARK: - Private Methods

  async _getNewSessionTokens(user: User) {
    const tokens = await this.jwtSessionService.getTokens(user.id, user.email);
    const rt = await argon.hash(tokens.refresh_token);

    await this.prisma.session
      .create({
        data: {
          userId: user.id,
          hashedRt: rt
        }
      });

    return tokens;
  }
}