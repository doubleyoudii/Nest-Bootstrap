import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserCreadentialsDTO } from './dto/user-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCreds: UserCreadentialsDTO): Promise<void> {
    const { username, password } = userCreds;
    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username Already Exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
