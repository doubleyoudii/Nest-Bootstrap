import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin-creds.dto';
import { UserCreadentialsDTO } from './dto/user-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() body: UserCreadentialsDTO): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('/signin')
  signin(@Body() body: SignInDTO): Promise<{ accessToken: string }> {
    return this.authService.signin(body);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  testRoute(@Req() req) {
    console.log(req);
  }
}
