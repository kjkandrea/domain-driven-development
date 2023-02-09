import {UserName} from 'user/values';
import {ExistError} from 'global/error';
import {UserService} from 'user/services/UserService';
import {IUserRepository} from 'user/repositories/UserRepository';
import {User} from 'user/entities/User';

export class UserApplicationService {
  private readonly userRepository: IUserRepository;
  private readonly userService: UserService;

  constructor(userRepository: IUserRepository, userService: UserService) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  public async register(userName: string): Promise<void> {
    const user = new User(new UserName(userName));

    const allReadyExist = await this.userService.exists(user);
    if (allReadyExist) throw new ExistError('이미 존재하는 UserName 입니다.');
    return this.userRepository.save(user);
  }
}
