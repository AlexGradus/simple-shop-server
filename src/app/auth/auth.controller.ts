import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'domain/auth.dto';
import { RefreshTokenDto } from 'domain/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('registration')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('sign-in')
  async signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @HttpCode(200)
  @Post('access-token')
  async accessToken(@Body() dto: RefreshTokenDto) {
    return this.authService.accessToken(dto.refreshToken);
  }

  @Get('sign-out')
  async signOut() {
    return { message: 'sign out successful' };
  }
}
