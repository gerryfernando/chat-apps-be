import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async getAllUser() {
    return await this.userService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string | number) {
    return await this.userService.findById(id);
  }
}
