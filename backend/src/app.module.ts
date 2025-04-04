/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Authentication/Auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { JwtStrategy } from './Authentication/strategy/jwt.strategy'; // Import JwtStrategy

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    FileModule,
    ConfigModule.forRoot({ isGlobal: true }), // Global config setup
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy, // Include JwtStrategy in the providers
  ],
})
export class AppModule {
  constructor(private readonly appService: AppService) {}

  // Optionally, set up a global prefix for routes
  configure(consumer) {
    consumer.apply().forRoutes('*');
  }
}
