import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Role } from 'src/services/eums';

export class RegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'kaushik@gmail.com',
    description: 'You need to give email id.',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  @MinLength(6)
  @ApiProperty({
    type: String,
    example: 'Kaushik@1',
    description: 'You need to give password.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Kaushik',
    description: 'You need to give first name.',
  })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Rathod',
    description: 'You need to give last name.',
  })
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '2000-07-01',
    description: 'You need to give date of birth.',
  })
  dob: string;

  @IsString()
  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    enum: Role,
    example: 'User',
    description: 'You need to give role.',
  })
  role: Role;
}
