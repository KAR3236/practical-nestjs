import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationDto } from './dto/registration.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ActiveAccountDto } from './dto/activeAccount.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/services/eums';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

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

  //List of users API.
  @ApiOperation({ summary: 'View users data.' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully get.',
  })
  // Guards for authorization.
  @UseGuards(JwtAuthGuard, RolesGuard)
  // This for bearer token added in swagger.
  @ApiBearerAuth()
  @Get('viewUser')
  // Add roles based on API
  @Roles(Role.USER, Role.ADMIN)
  viewUser(@Request() request) {
    return this.userService.viewUser(request);
  }
}
