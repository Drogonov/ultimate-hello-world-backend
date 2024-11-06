import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { JWT } from 'src/common/constants/constants';
import { ConfigurationService } from 'src/config/configuration.service';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, JWT) {
  constructor(config: ConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getAccessTokenSecret(),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
