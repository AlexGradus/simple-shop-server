import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'domain/auth.dto';
import { RefreshTokenDto } from 'domain/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @HttpCode(200)
  @Post('login/access-token')
  async accessToken(@Body() dto: RefreshTokenDto) {
    return this.authService.accessToken(dto.refreshToken);
  }
}
