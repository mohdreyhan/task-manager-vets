import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task/task.entity';
import { Repository } from 'typeorm';
import {
  CreateTaskDto,
  UpdateTaskDto,
  TaskStatus,
  UserRole,
} from '@my-monorepo/data';
import { User } from '../entities/user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>
  ) {}

  async create(dto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.taskRepo.create({
      ...dto,
      status: TaskStatus.Todo,
      assignedTo: dto.assignedTo || user.id,
      organizationId: dto.organizationId || user.organizationId,
    });
    return await this.taskRepo.save(task);
  }

  async findAll(user: User): Promise<Task[]> {
    if (user.role === UserRole.Admin) {
      return this.taskRepo.find();
    }
    return this.taskRepo.find({
      where: { organizationId: user.organizationId },
    });
  }

  async findOne(id: string): Promise<Task | null> {
    return await this.taskRepo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task | null> {
    const task = await this.findOne(id);
    if (!task) return null;

    const updated = this.taskRepo.merge(task, dto);
    return await this.taskRepo.save(updated);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.taskRepo.delete(id);
    return result.affected > 0;
  }
}
