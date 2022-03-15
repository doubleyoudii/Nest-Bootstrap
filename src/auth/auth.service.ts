import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreadentialsDTO } from './dto/user-credentials.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './dto/signin-creds.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userCreds: UserCreadentialsDTO): Promise<void> {
    return this.userRepository.createUser(userCreds);
  }

  async signin(userCreds: SignInDTO): Promise<{ accessToken: string }> {
    const { username, password } = userCreds;

    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const token = await this.jwtService.sign(payload);
      return { accessToken: token };
      // return 'success';
    } else {
      throw new UnauthorizedException('Please Check yung Login Credentials');
    }
  }
}
