import { UserDetails } from './../user/user-details.interface';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { NewUserDTO } from 'src/user/dto/new-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }
}
