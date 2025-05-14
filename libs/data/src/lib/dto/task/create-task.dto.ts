import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string = '';

  @IsString()
  description?: string = '';

  @IsString()
  @IsNotEmpty()
  assignedTo: string = '';

  @IsString()
  @IsNotEmpty()
  organizationId: string = '';
}
