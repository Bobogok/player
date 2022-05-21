import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      nickname: user.nickname,
      email: user.email,
      sex: user.sex,
      dateOfBirth: user.dateOfBirth,
      phone: user.phone,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByNickname(nickname: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ nickname }).exec();
  }

  async findByPhone(phone: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ phone }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    firstName: string,
    secondName: string,
    nickname: string,
    email: string,
    hashedPassword: string,
    sex?: string,
    dateOfBirth?: string,
    phone?: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      firstName: firstName,
      secondName: secondName,
      nickname: nickname,
      email: email,
      password: hashedPassword,
      sex: sex,
      dateOfBirth: dateOfBirth,
      phone: phone,
    });

    return newUser.save();
  }
}
