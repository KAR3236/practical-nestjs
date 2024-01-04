import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { Status } from 'src/services/eums';

export class AddBlogDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: '2',
    description: 'You need to give userId of user.',
  })
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Blog 1',
    description: 'You need to give title of blog.',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Blog 1 Description',
    description: 'You need to give description of blog.',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '2023-12-01',
    description: 'You need to give publised_date of blog.',
  })
  publised_date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '2023-12-01',
    description: 'You need to give modify_date of blog.',
  })
  modify_date: string;

  @IsString()
  @IsEnum(Status)
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    enum: Status,
    example: 'Publish',
    description: 'You need to give status of blog.',
  })
  status: Status;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Economics',
    description: 'You need to give category of blog.',
  })
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Kaushik',
    description: 'You need to give author of blog.',
  })
  author: string;
}
