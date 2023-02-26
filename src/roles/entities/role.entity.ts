import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permission } from '../../permissions/entities/permission.entity';
import { RolesPermissions } from './role-permission.entity';
import { User } from '../../users/entities/user.entity';
import { UsersRoles } from './users-roles.entity';

@Table({})
export class Role extends Model<Role> {
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

  @BelongsToMany(() => User, () => UsersRoles)
  users: User[];

  @BelongsToMany(() => Permission, () => RolesPermissions)
  permissions: Permission[];
}
