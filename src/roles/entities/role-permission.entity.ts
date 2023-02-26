import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permission } from '../../permissions/entities/permission.entity';
import { Role } from './role.entity';

@Table({})
export class RolesPermissions extends Model<RolesPermissions> {
  @ForeignKey(() => Role)
  @Column({
    type: DataType.STRING(45),
    allowNull: false,
    primaryKey: true,
  })
  roleName: string;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.STRING(45),
    allowNull: false,
    primaryKey: true,
  })
  permissionName: string;
}
