import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationDto } from './dto/registration.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ActiveAccountDto } from './dto/activeAccount.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //Registration API.
  @ApiOperation({ summary: 'People can do register.' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  @Post('registration')
  registration(@Body() registrationDto: RegistrationDto) {
    return this.userService.registration(registrationDto);
  }

  //Login API.
  @ApiOperation({ summary: 'User and Admin can do login.' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
  })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  //Active account API.
  @ApiOperation({ summary: 'Active account.' })
  @ApiResponse({
    status: 202,
    description: 'The user has been successfully activated.',
  })
  @Put('activeAccount')
  activeAccount(@Body() activeAccountDto: ActiveAccountDto) {
    return this.userService.activeAccount(activeAccountDto);
  }
}
