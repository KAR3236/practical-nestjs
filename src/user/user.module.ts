import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: 'JWTPrivateKey',
      signOptions: { expiresIn: '5h' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
