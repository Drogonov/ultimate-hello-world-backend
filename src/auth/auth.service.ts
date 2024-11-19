import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { Tokens } from 'src/common/types';
import { JWTSessionService } from 'src/jwt-session/jwt-session.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtSessionService: JWTSessionService
  ) { }

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);
    let user: User;
    
    try {
      user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ForbiddenException('Email is already registered, please sign in.');
      }
      throw error;
    }
    
    const tokens = await this._getNewSessionTokens(user);
    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: { sessions: true }
    });

    if (!user) throw new ForbiddenException('Cant find following user.');

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Password Incorrect.');

    const tokens = await this._getNewSessionTokens(user);
    return tokens;
  }

  async logout(userId: number, rt: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { sessions: true }
    });
    await this.jwtSessionService.endSession(user, rt);

    return true;
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
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
