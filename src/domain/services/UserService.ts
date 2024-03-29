import {IUserRepository} from 'infrastructure/users';
import {User} from 'domain/models/users';
import {injectable, inject} from 'inversify';
import {TYPES} from 'types';

@injectable()
export class UserService {
  private userRepository: IUserRepository;

  constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  // 중복 규칙이 이메일 중복 금지 등으로 변경될 경우 Service 계층 수정을 통해 대응할 수 있다.
  // Service 계층에서 '어떻게 중복확인을 할지' 를 추상화 하였기 때문에 ApplicationService 계층의 변경은 일어나지 않는다.
  public exists(user: User): Promise<boolean> {
    return this.userRepository
      .findByName(user.getUserName())
      .then(user => user !== null);
  }
}
