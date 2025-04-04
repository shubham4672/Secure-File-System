/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { PrismaModule } from '../prisma/prisma.module'; // Correct relative path
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './guards/role.guard'; // Updated path to correct location
import { RtStrategy } from './strategy/rt.strategy';
import { AtStrategy } from './strategy/at.strategy';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, RolesGuard],
})
export class AuthModule {}
