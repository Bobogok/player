import { UserDetails } from './../user/user-details.interface';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { ExistingUserDTO } from 'src/user/dto/existing-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() user: ExistingUserDTO,
  ): Promise<Omit<UserDetails, string> | null> {
    return this.authService.login(user);
  }
}
