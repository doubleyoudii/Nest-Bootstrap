import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreadentialsDTO } from './dto/user-credentials.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  signUp(userCreds: UserCreadentialsDTO): Promise<void> {
    return this.userRepository.createUser(userCreds);
  }
}
