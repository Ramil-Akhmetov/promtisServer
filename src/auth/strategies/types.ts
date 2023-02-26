import { Role } from '../../roles/entities/role.entity';

export interface JwtPayload {
  userId: number;
  email: string;
  roles: Role[];
  // iat: number;
  // exp: number;
}

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
