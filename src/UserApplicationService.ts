import {UserData, UserId, UserName} from 'user/values';
import {ExistError, NotFoundError} from 'global/error';
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

  public async get(userId: number): Promise<UserData | null> {
    const targetId = new UserId(userId);
    const user = await this.userRepository.findById(targetId);
    return user?.getValues() ?? null;
  }

  public async update(userData: UserData): Promise<void> {
    const targetId = new UserId(userData.id);
    const user = await this.userRepository.findById(targetId);
    if (user === null) {
      throw new NotFoundError('해당 user 를 찾을 수 없습니다.');
    }

    const userName = new UserName(userData.name);
    user.changeName(userName);
    const hasExist = await this.userService.exists(user);
    if (hasExist) {
      throw new ExistError('이미 존재하는 UserName 입니다.');
    }

    return this.userRepository.save(user);
  }
}
