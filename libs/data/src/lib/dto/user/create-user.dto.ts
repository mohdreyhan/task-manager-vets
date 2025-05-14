import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { UserRole } from '../../data';

export class CreateUserDto {
  @IsString()
  username: string = '';

  @IsString()
  password: string = '';

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsString()
  organizationId: string = '';
}
