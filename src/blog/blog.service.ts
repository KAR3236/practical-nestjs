import { Injectable } from '@nestjs/common';
import { AddBlogDto } from './dto/addBlog.dto';
import { handelResponse } from 'src/services/handleResponse';
import { message } from 'src/services/messages';
import { Blog } from 'src/models/blog.model';
import { InjectModel } from '@nestjs/sequelize';
import { AddBlogInterface } from 'src/services/blogInterface';
import { EditBlogDto } from './dto/editBlog.dto';
import { User } from 'src/models/user.model';
import { ListOfBlogDto } from './dto/listOfBlog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog)
    private blogModel: typeof Blog,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async addBlog(dto: AddBlogDto) {
    try {
      const blogData: AddBlogInterface = await this.blogModel.create({
        ...dto,
      });

      if (blogData) {
        return handelResponse({
          statusCode: 201,
          message: `Blog ${message.ADDED_SUCCESSFULLY}`,
        });
      }
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return handelResponse({
          statusCode: 400,
          message: error.errors[0].message,
        });
      } else {
        return handelResponse({
          statusCode: 500,
          message: message.PLEASE_TRY_AGAIN,
        });
      }
    }
  }

  async editBlog(params: any, dto: EditBlogDto) {
    try {
      const [blogData]: number[] = await this.blogModel.update(
        {
          ...dto,
        },
        {
          where: { id: params.id },
        },
      );

      if (blogData === 1) {
        return handelResponse({
          statusCode: 202,
          message: `Blog ${message.UPDATED_SUCCESSFULLY}`,
        });
      } else {
        return handelResponse({
          statusCode: 400,
          message: `Data ${message.NOT_FOUND}`,
        });
      }
    } catch (error) {
      return handelResponse({
        statusCode: 500,
        message: message.PLEASE_TRY_AGAIN,
      });
    }
  }

  async viewBlog(params: any) {
    try {
      const blogData: AddBlogInterface = await this.blogModel.findOne({
        where: { id: params.id },
      });

      if (blogData) {
        return handelResponse({
          statusCode: 202,
          message: `Blog ${message.VIEW_SUCCESSFULLY}`,
          data: blogData,
        });
      } else {
        return handelResponse({
          statusCode: 400,
          message: `Data ${message.NOT_FOUND}`,
        });
      }
    } catch (error) {
      return handelResponse({
        statusCode: 500,
        message: message.PLEASE_TRY_AGAIN,
      });
    }
  }

  async listOfBlog(dto: ListOfBlogDto) {
    try {
      const [blogData]: any[] = await this.userModel.findAll({
        attributes: [
          'id',
          [
            this.userModel.sequelize.literal(
              `CONCAT(first_name, ' ' ,last_name)`,
            ),
            'full_name',
          ],
        ],
        include: [
          {
            model: this.blogModel,
            where: dto.userId ? { userId: dto.userId } : {},
            order: [['id', 'DESC']],
          },
        ],
      });

      if (blogData.blog.length > 0) {
        return handelResponse({
          statusCode: 202,
          message: `${message.LIST_OF_VIEW_SUCCESSFULLY}`,
          data: blogData,
        });
      } else {
        return handelResponse({
          statusCode: 400,
          message: `Data ${message.NOT_FOUND}`,
        });
      }
    } catch (error) {
      return handelResponse({
        statusCode: 500,
        message: message.PLEASE_TRY_AGAIN,
      });
    }
  }

  async deleteBlog(params: any) {
    try {
      const blogData: number = await this.blogModel.destroy({
        where: { id: params.id },
      });

      if (blogData) {
        return handelResponse({
          statusCode: 200,
          message: `Blog ${message.DELETED_SUCCESSFULLY}`,
        });
      } else {
        return handelResponse({
          statusCode: 400,
          message: `Data ${message.NOT_FOUND}`,
        });
      }
    } catch (error) {
      return handelResponse({
        statusCode: 500,
        message: message.PLEASE_TRY_AGAIN,
      });
    }
  }
}
