import {UserLiteral, UserId, UserName} from 'domain/models/users';
import {ExistError, NotFoundError} from 'global/error';
import {UserService} from 'domain/services/UserService';
import {IUserRepository} from 'user/repositories/UserRepository';
import {User} from 'domain/models/users/User';
import {injectable, inject} from 'inversify';
import {TYPES} from 'types';

@injectable()
class UserRegisterService {
  private readonly userRepository: IUserRepository;
  private readonly userService: UserService;

  constructor(
    @inject(TYPES.IUserRepository) userRepository: IUserRepository,
    @inject(TYPES.UserService) userService: UserService
  ) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  public async register(userName: string): Promise<void> {
    const user = new User(new UserName(userName));

    const hasExist = await this.userService.exists(user);
    if (hasExist) throw new ExistError('이미 존재하는 user 입니다.');
    return this.userRepository.save(user);
  }

  public async get(userId: number): Promise<UserLiteral | null> {
    const user = await this.getUser(userId);
    return user?.getValues() ?? null;
  }

  public async getAll(): Promise<UserLiteral[]> {
    const users = await this.userRepository.getAll();
    return users.map(user => user.getValues());
  }

  public async update(userData: UserLiteral): Promise<void> {
    const user = await this.getUser(userData.id);
    if (user === null) {
      throw new NotFoundError('해당 user 를 찾을 수 없습니다.');
    }

    const userName = new UserName(userData.name);
    user.changeName(userName);
    const hasExist = await this.userService.exists(user);
    if (hasExist) {
      throw new ExistError('이미 존재하는 user 입니다.');
    }

    return this.userRepository.save(user);
  }

  private getUser(userId: number): Promise<User | null> {
    const targetId = new UserId(userId);
    return this.userRepository.findById(targetId);
  }
}

export {UserRegisterService};
