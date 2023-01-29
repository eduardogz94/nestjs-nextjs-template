import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [PassportModule, JwtAuthModule],
})
export class AuthModule {}
