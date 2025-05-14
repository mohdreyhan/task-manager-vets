import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { OrganizationService } from './org.service';
import { CreateOrganizationDto, UpdateOrganizationDto, UserRole } from '@my-monorepo/data';
import { JwtAuthGuard, Roles, RolesGuard } from '@my-monorepo/auth';

@Controller('organizations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}

  @Post()
  @Roles(UserRole.Admin)
  create(@Body() dto: CreateOrganizationDto) {
    // Optionally enforce the organization creation is restricted to a global admin
    return this.orgService.create(dto);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.User)
  findAll() {
    return this.orgService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.Manager, UserRole.User)
  findOne(@Param('id') id: string) {
    return this.orgService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.Admin)
  update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    return this.orgService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  remove(@Param('id') id: string) {
    return this.orgService.remove(id);
  }
}
