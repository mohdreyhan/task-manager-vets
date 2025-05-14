export function data(): string {
  return 'data';
}

export * from './enums/user.role.enum';
export * from './enums/permissions.enum';
export * from './enums/task-status.enum';

export * from './interfaces/task.interface';

export * from './dto/task/create-task.dto';
export * from './dto/task/update-task.dto';
export * from './dto/user/create-user.dto';
export * from './dto/user/update-user.dto';
export * from './dto/organization/create-org.dto';
export * from './dto/organization/update-org.dto';
