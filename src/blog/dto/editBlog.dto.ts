import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Status } from 'src/services/eums';

export class EditBlogDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'Blog 1 edit',
    description: 'You need to give title of blog.',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'Blog 1 Description edit',
    description: 'You need to give description of blog.',
  })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: '2023-12-01',
    description: 'You need to give publised_date of blog.',
  })
  publised_date: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: '2023-12-01',
    description: 'You need to give modify_date of blog.',
  })
  modify_date: string;

  @IsString()
  @IsEnum(Status)
  @IsOptional()
  @ApiProperty({
    type: String,
    enum: Status,
    example: 'Publish',
    description: 'You need to give status of blog.',
  })
  status: Status;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'Economics edit',
    description: 'You need to give category of blog.',
  })
  category: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'Kaushik edit',
    description: 'You need to give author of blog.',
  })
  author: string;
}
