import { UserDetails } from './../user/user-details.interface';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dto/new-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const { name, email, password } = user;
    console.log(name, email, password);

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) return 'Email taken!';

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create(name, email, hashedPassword);

    return this.userService._getUserDetails(newUser);
  }
}
