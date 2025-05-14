export function auth(): string {
  return 'auth';
}

export * from "./guards/roles.gaurd";
export * from "./guards/permissions.gaurd";
export * from "./decorators/roles.decorator";
export * from './guards/jwt.strategy';
export * from "./guards/jwt.gaurd";
export * from "./decorators/permissions.decorator";
export * from "./constants/role-permissions.map";
