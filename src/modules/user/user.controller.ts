import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest } from './dtos/user.req';

@Controller('user')
export class UserController {
  @Post('login')
  login(@Body() payload: LoginRequest) {}
}
