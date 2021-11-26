import { SetMetadata } from "@nestjs/common";

export const AllowedRole = (...codes: string[]) => SetMetadata("roleCodes", codes);