import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthRequestDto, ISignUpResponse, ILogoutResponse } from './dto';
import { ITokensResponse } from 'src/common/dto';
import { JWTSessionService } from 'src/jwt-session/jwt-session.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtSessionService: JWTSessionService,
    private mailService: MailService
  ) { }

  async signupLocal(dto: AuthRequestDto): Promise<ISignUpResponse> {
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

      return { status: "Success" };

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ForbiddenException('Email is already registered, please sign in.');
      }
      throw error;
    }
  }

  async verifyOTP(dto: AuthRequestDto): Promise<ITokensResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !await argon.verify(user.otpHash, dto.password)) {
      throw new ForbiddenException('Invalid OTP');
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

  async signinLocal(dto: AuthRequestDto): Promise<ITokensResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: { sessions: true }
    });

    if (!user) throw new ForbiddenException('Cant find following user.');

    if (user.isVerificated == false) throw new ForbiddenException('Need to verify user with OTP');

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Password Incorrect.');

    const tokens = await this._getNewSessionTokens(user);
    return tokens;
  }

  async logout(userId: number, rt: string): Promise<ILogoutResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { sessions: true }
    });
    await this.jwtSessionService.endSession(user, rt);

    return { status: "Success" };
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
    await this.jwtSessionService.updateRtHash(user, tokens.refresh_token);

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
function LogoutResponse(): ILogoutResponse | PromiseLike<ILogoutResponse> {
  throw new Error('Function not implemented.');
}

