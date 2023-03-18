import {UserId} from 'domain/models/users';
import {IUserRepository} from 'infrastructure/users';
import {User} from 'domain/models/users/User';
import {injectable, inject} from 'inversify';
import {TYPES} from 'types';

@injectable()
class UserDeleteService {
  private readonly userRepository: IUserRepository;

  constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
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

export {UserDeleteService};
