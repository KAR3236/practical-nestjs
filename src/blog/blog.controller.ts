import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { AddBlogDto } from './dto/addBlog.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/services/eums';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { EditBlogDto } from './dto/editBlog.dto';
import { ListOfBlogDto } from './dto/listOfBlog.dto';

@Controller('blog')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class BlogController {
  constructor(private blogService: BlogService) {}

  //Add blog API.
  @ApiOperation({ summary: 'User can add blog.' })
  @ApiResponse({
    status: 201,
    description: 'The blog has been successfully added.',
  })
  @Post('addBlog')
  @Roles(Role.USER)
  addBlog(@Body() addBlogDto: AddBlogDto) {
    return this.blogService.addBlog(addBlogDto);
  }

  //Edit blog API.
  @ApiOperation({ summary: 'User can edit blog.' })
  @ApiResponse({
    status: 202,
    description: 'The blog has been successfully edited.',
  })
  @ApiParam({ name: 'id', example: 1, description: 'Pass blog ID here.' })
  @Post('editBlog/:id')
  @Roles(Role.USER)
  editBlog(@Param() params: any, @Body() editBlogDto: EditBlogDto) {
    return this.blogService.editBlog(params, editBlogDto);
  }

  //View blog API.
  @ApiOperation({ summary: 'User can view blog.' })
  @ApiResponse({
    status: 200,
    description: 'The blog has been successfully view.',
  })
  @Post('viewBlog/:id')
  @ApiParam({ name: 'id', example: 1, description: 'Pass blog ID here.' })
  @Roles(Role.USER)
  viewBlog(@Param() params: any) {
    return this.blogService.viewBlog(params);
  }

  //List of blog API.
  @ApiOperation({ summary: 'User can view list of blog.' })
  @ApiResponse({
    status: 200,
    description: 'The blog has been successfully view.',
  })
  @Post('listOfBlog')
  @Roles(Role.USER, Role.ADMIN)
  listOfBlog(@Body() listOfBlogDto: ListOfBlogDto) {
    return this.blogService.listOfBlog(listOfBlogDto);
  }

  //Delete blog API.
  @ApiOperation({ summary: 'User can delete blog.' })
  @ApiResponse({
    status: 200,
    description: 'The blog has been successfully deleted.',
  })
  @Delete('deleteBlog/:id')
  @ApiParam({ name: 'id', example: 1, description: 'Pass blog ID here.' })
  @Roles(Role.USER)
  deleteBlog(@Param() params: any) {
    return this.blogService.deleteBlog(params);
  }
}
