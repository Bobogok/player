import { ExistingUserDTO } from './../user/dto/existing-user.dto';
import { UserDetails } from './../user/user-details.interface';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { JwtService } from '@nestjs/jwt';
import { setMaxListeners } from 'process';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const {
      firstName,
      secondName,
      nickname,
      email,
      dateOfBirth,
      sex,
      phone,
      password,
    } = user;

    console.log(
      firstName,
      secondName,
      nickname,
      email,
      dateOfBirth,
      sex,
      phone,
      password,
    );

    const existingEmail = await this.userService.findByEmail(email);
    const existingNickname = await this.userService.findByNickname(nickname);
    const existingPhone = phone && (await this.userService.findByPhone(phone));

    if (existingEmail) return 'Email taken!';
    if (existingNickname) return 'Nickname taken!';
    if (existingPhone) return 'Phone number taken!';

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create(
      firstName,
      secondName,
      nickname,
      email,
      hashedPassword,
      sex,
      dateOfBirth,
      phone,
    );

    return this.userService._getUserDetails(newUser);
  }

  async doesPasswordMatch(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }

  async login(
    existingUser: ExistingUserDTO,
  ): Promise<Omit<UserDetails, string> | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) return null;

    const { firstName, secondName, nickname, dateOfBirth, phone, sex } = user;

    const jwt = await this.jwtService.signAsync({ user });

    return {
      token: jwt,
      firstName: firstName,
      secondName: secondName,
      nickname: nickname,
      dateOfBirth: dateOfBirth,
      phone: phone,
      sex: sex,
    };
  }
}
