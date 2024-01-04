import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Status } from 'src/services/eums';
import { User } from './user.model';

@Table({ tableName: 'Blog' })
export class Blog extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  publised_date: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  modify_date: Date;

  @Column({
    type: DataType.ENUM(...Object.values(Status)),
    allowNull: false,
  })
  status: Status;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @BelongsTo(() => User)
  user: User;
}
