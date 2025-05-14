import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  NotFoundException,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  CreateTaskDto,
  Permission,
  UpdateTaskDto,
  UserRole,
} from '@my-monorepo/data';
import { RequestWithUser } from '../entities/user/request-with-user.entity.interface';
import { Roles, RolesGuard, Permissions, JwtAuthGuard } from '@my-monorepo/auth';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Roles(UserRole.Admin, UserRole.Manager)
  @Permissions(Permission.CreateTask)
  create(@Req() req: RequestWithUser, @Body() dto: CreateTaskDto) {
    return this.taskService.create(dto, req.user);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.User)
  findAll(@Req() req: RequestWithUser) {
    return this.taskService.findAll(req.user);
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.User)
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Patch(':id')
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.User)
  @Permissions(Permission.UpdateTask)
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const task = await this.taskService.update(id, dto);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Delete(':id')
  @Roles(UserRole.Admin, UserRole.Manager)
  @Permissions(Permission.DeleteTask)
  async remove(@Param('id') id: string) {
    const deleted = await this.taskService.remove(id);
    if (!deleted) throw new NotFoundException('Task not found');
    return { message: 'Task deleted successfully' };
  }
}
