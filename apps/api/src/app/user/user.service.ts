import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, UserRole } from '@my-monorepo/data';
import { RolePermissionsMap } from '@my-monorepo/auth';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.role !== UserRole.Admin && !dto.organizationId) {
      throw new BadRequestException(
        'Non-admins must belong to an organization'
      );
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashedPassword });
    user.permissions = RolePermissionsMap[user.role] || [];
    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null;
    const updated = this.userRepo.merge(user, dto);
    return await this.userRepo.save(updated);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userRepo.delete(id);
    return result.affected > 0;
  }
}
