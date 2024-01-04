import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class ListOfBlogDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 2,
    description: 'You need to give userId of user.',
  })
  userId?: number;
}
