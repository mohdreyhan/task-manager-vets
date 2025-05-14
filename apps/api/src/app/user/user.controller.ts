import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserRole } from '@my-monorepo/data';
import { JwtAuthGuard, Roles, RolesGuard } from '@my-monorepo/auth';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
    // @Roles(UserRole.Admin, UserRole.Manager)
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.userService.update(id, dto);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.userService.remove(id);
    if (!deleted) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }
}
