import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from './role.entity';
import { User } from '../../users/entities/user.entity';

@Table({})
export class UsersRoles extends Model<UsersRoles> {
  @ForeignKey(() => Role)
  @Column({ type: DataType.STRING(45), unique: true, primaryKey: true })
  roleName: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER.UNSIGNED, unique: true, primaryKey: true })
  userId: number;
}
