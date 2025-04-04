/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types'; // Adjust the path as necessary

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'access-secret', // Secret key for JWT validation (replace with your actual secret)
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    // Optionally, you can validate the payload here
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
