import {IUserRepository} from 'user/repositories/UserRepository';
import {User} from 'user/entities/User';

export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public exists(user: User): Promise<boolean> {
    return this.userRepository
      .find(user.getUserName())
      .then(user => user !== null);
  }
}
