import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from '../../users/entities/user.entity';

@Table({})
export class Token extends Model<Token> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING(256),
  })
  refreshToken: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
