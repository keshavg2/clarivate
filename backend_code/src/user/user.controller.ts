import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health Check' })
  @ApiResponse({ status: 200, description: 'Service is up and running' })
  healthCheck() {
    return { status: 'OK' };
  }

  @Post('signup')
  @ApiOperation({ summary: 'User Signup' })
  @ApiResponse({ status: 201, description: 'User successfully signed up' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async signup(@Body() signUpDto: SignUpDto) {
    const { name, email, password, organization } = signUpDto;
    return this.userService.signup(name, email, password, organization);
  }

  @Post('signin')
  @ApiOperation({ summary: 'User Signin' })
  @ApiResponse({ status: 200, description: 'User successfully signed in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signin(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.userService.signin(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('dashboard')
  @ApiOperation({ summary: 'User Dashboard' })
  @ApiResponse({ status: 200, description: 'Access to the user dashboard' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async dashboard(@Request() req) {
    return { message: 'Welcome to your dashboard', data: req.user };
  }
}
