import { UserRole, Permission } from '@my-monorepo/data';

export const RolePermissionsMap: Record<UserRole, Permission[]> = {
  [UserRole.Admin]: [
    Permission.CreateTask,
    Permission.UpdateTask,
    Permission.DeleteTask,
    Permission.ViewUsers,
    Permission.ManageUsers,
    Permission.ManageOrg,
    Permission.ViewOrg
  ],
  [UserRole.Manager]: [
    Permission.CreateTask,
    Permission.UpdateTask,
    Permission.DeleteTask,
    Permission.ViewUsers,
    Permission.ManageUsers,
    Permission.ViewOrg
  ],
  [UserRole.User]: [
    Permission.ViewUsers,
    Permission.CreateTask,
    Permission.UpdateTask,
    Permission.ViewOrg

  ],
};
