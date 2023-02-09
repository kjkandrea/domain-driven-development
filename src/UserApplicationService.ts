import {UserData, UserId, UserName} from 'user/values';
import {ExistError, NotFoundError} from 'global/error';
import {UserService} from 'user/services/UserService';
import {IUserRepository} from 'user/repositories/UserRepository';
import {User} from 'user/entities/User';

// 응집도 관점에서 보았을때에 바람직한 상태가 아니다.
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
    const user = await this.getUser(userId);
    return user?.getValues() ?? null;
  }

  public async update(userData: UserData): Promise<void> {
    const user = await this.getUser(userData.id);
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

  public async delete(userId: number): Promise<void> {
    const user = await this.getUser(userId);

    if (user === null) {
      // 탈퇴 대상 사용자가 발견되지 않았다면 탈퇴 처리 성공으로 간주한다.
      return;
    }

    return this.userRepository.delete(user);
  }

  private getUser(userId: number): Promise<User | null> {
    const targetId = new UserId(userId);
    return this.userRepository.findById(targetId);
  }
}
