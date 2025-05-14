import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { OrganizationService } from './org.service';
import { CreateOrganizationDto, UpdateOrganizationDto, UserRole } from '@my-monorepo/data';
import { JwtAuthGuard, Roles, RolesGuard } from '@my-monorepo/auth';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
    create(@Body() dto: CreateOrganizationDto) {
    return this.orgService.create(dto);
  }

  @Get()
  findAll() {
    return this.orgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orgService.findOne(id);
  }

  @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)

  @Roles(UserRole.Admin)
  update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    return this.orgService.update(id, dto);
  }

  @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)

  @Roles(UserRole.Admin)
  remove(@Param('id') id: string) {
    return this.orgService.remove(id);
  }
}
