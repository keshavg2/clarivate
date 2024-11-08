import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SignUpDto } from './dto/sign-up.dto';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get('health')
  healthCheck() {
    return { status: 'OK' };
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    const { name, email, password, organization } = signUpDto;
    return this.userService.signup(name, email, password, organization);
  }

  @Post('signin')
  async signin(@Body() body) {
    const { email, password } = body;
    return this.userService.signin(email, password);
  }
  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  async dashboard(@Request() req) {
    console.log(req.user);
    return { message: 'Welcome to your dashboard', data: req.user};
  }
}
