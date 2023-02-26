import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../../roles/entities/role.entity';
import { RolesPermissions } from '../../roles/entities/role-permission.entity';

@Table({})
export class Permission extends Model<Permission> {
  @Column({
    type: DataType.STRING(45),
    primaryKey: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => Role, () => RolesPermissions)
  roles: Role[];
}
