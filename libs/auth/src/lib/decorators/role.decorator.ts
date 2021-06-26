import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@web-scraping/orm";

export type AllowedRoles = keyof typeof UserRole | 'any';

export const Role = (...args: AllowedRoles[]) => SetMetadata("roles", args);
