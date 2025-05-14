import { TaskStatus } from '../enums/task-status.enum';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignedTo: string; // userId
  organizationId: string;
}
