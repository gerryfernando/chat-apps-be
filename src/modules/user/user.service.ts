import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectModel(User.name) private readonly userModel: Model<User>,
  // ) {}
  // async getAll(): Promise<User[]> {
  //   const users = await this.userModel.find().exec();
  //   return users;
  // }
}
