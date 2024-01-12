import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from 'src/models/blog.model';
import { User } from 'src/models/user.model';

@Module({
  // Here, Make configuration of sequelize module for which models need to use in blog services.
  // So, Add all models which are used in blog services.
  imports: [SequelizeModule.forFeature([Blog, User])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
