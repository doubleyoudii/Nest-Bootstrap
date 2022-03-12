import { EntityRepository, Repository } from 'typeorm';
import { UserCreadentialsDTO } from './dto/user-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCreds: UserCreadentialsDTO): Promise<void> {
    const { username, password } = userCreds;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
