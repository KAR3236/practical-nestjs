import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
