import { Body, Controller, Post } from '@nestjs/common';
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
  signin(@Body() body: SignInDTO): Promise<string> {
    return this.authService.signin(body);
  }
}
