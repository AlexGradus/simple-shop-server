import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'app/auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('current')
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id);
  }
}
