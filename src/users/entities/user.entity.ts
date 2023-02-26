import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsToMany,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Role } from '../../roles/entities/role.entity';
import { UsersRoles } from '../../roles/entities/users-roles.entity';
import { Token } from '../../tokens/entities/token.entity';

@Table({})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
  })
  id: number;

  @Column({ allowNull: false, type: DataTypes.STRING(45) })
  name: string;

  @Column({ allowNull: false, type: DataTypes.STRING(45) })
  surname: string;

  @Column({ allowNull: false, type: DataTypes.STRING(45) })
  patronymic: string;

  @Column({ allowNull: false, unique: true, type: DataTypes.STRING(45) })
  login: string;

  @Column({ allowNull: false, type: DataTypes.STRING(64) })
  password: string;

  @Column({ allowNull: false, unique: true, type: DataTypes.STRING(45) })
  email: string;

  @Column({ allowNull: false, unique: true, type: DataTypes.STRING(45) })
  phone: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING(1),
    validate: { isIn: [['M', 'F']] },
  })
  sex: string;

  @Column({ allowNull: false, type: DataTypes.DATE })
  birthday: Date;

  @Column({ allowNull: false, type: DataTypes.BOOLEAN, defaultValue: true })
  isOnline: boolean;

  @Column({
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  })
  lastLogin: Date;

  @BelongsToMany(() => Role, () => UsersRoles)
  roles: Role[];

  @HasOne(() => Token)
  token: Token;
}
