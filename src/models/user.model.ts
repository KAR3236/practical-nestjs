import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/services/eums';
import { Blog } from './blog.model';

@Table({ tableName: 'User' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dob: Date;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    allowNull: false,
  })
  role: Role;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  status: boolean;

  @HasMany(() => Blog, { foreignKey: 'userId' })
  blog: Blog;
}
