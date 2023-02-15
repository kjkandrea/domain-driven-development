import {User} from 'user/entities/User';
import {UserId, UserName} from 'user/values';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  save(user: User): Promise<void>;
  delete(user: User): Promise<void>;
  findByName(userName: UserName): Promise<User | null>;
  findById(userId: UserId): Promise<User | null>;

  // 레포지토리의 책임은 퍼시스턴시 까지이다. 사용자명의 중복 확인은 도메인 규칙에 가깝다.
  // exists(user: User): Promise<boolean>
}
