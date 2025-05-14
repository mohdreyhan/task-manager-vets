import { IsString, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../data';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  organizationId?: string;
}
