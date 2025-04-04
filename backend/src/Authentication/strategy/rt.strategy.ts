/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload, JwtPayloadWithRt } from '../types'; // Make sure these types are defined correctly

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'rt-secret', // Use environment variable for the secret key
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();

    if (!refreshToken) {
      throw new ForbiddenException('Refresh token malformed');
    }

    // Here, you can also check if the refresh token is valid against a database or other storage
    // For example, check if the refresh token exists in the database and is not expired.

    return {
      ...payload,
      refreshToken,
    };
  }
}
