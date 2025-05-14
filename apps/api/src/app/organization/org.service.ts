// apps/api/src/app/organization/organization.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organization/organization.entity';
import { CreateOrganizationDto, UpdateOrganizationDto } from '@my-monorepo/data';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
  ) {}

  create(dto: CreateOrganizationDto) {
    const org = this.orgRepo.create(dto);
    return this.orgRepo.save(org);
  }

  findAll() {
    return this.orgRepo.find();
  }

  async findOne(id: string) {
    const org = await this.orgRepo.findOne({ where: { id } });
    if (!org) throw new NotFoundException('Organization not found');
    return org;
  }

  async update(id: string, dto: UpdateOrganizationDto) {
    await this.orgRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.orgRepo.delete(id);
    return { message: 'Deleted successfully' };
  }
}
