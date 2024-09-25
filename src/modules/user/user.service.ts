import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/CreateUser.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(payload: CreateUserDto) {
    const { username, password, email } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return { message: 'Register Success' };
  }

  async login(payload: CreateUserDto): Promise<{ token: string }> {
    const { username, password } = payload;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid Email Or Password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid Password');
    }
    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: number | string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }
}
