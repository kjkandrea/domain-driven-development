import {UserName} from 'user/values';
import {ExistError} from 'global/error';
import {UserService} from 'user/services/UserService';
import {
  IUserRepository,
  UserRepository,
} from 'user/repositories/UserRepository';
import {User} from 'user/entities/User';

export class Program {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(userName: string): Promise<void> {
    const user = new User(new UserName(userName));
    const userService = new UserService(this.userRepository);

    const allReadyExist = await userService.exists(user);
    if (allReadyExist) throw new ExistError('이미 존재하는 UserName 입니다.');
    return this.userRepository.save(user);
  }
}

const program = new Program(new UserRepository());
program.createUser('karenina').then(console.log);
