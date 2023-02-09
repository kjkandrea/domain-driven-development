import type {IUserRepository} from 'user/repositories/UserRepository';
import {User} from 'user/entities/User';
import {UserName, UserId} from 'user/values';

export class InMemoryUserRepository implements IUserRepository {
  private store: Map<UserId, User> = new Map();

  public save(user: User): Promise<void> {
    return new Promise(resolve => {
      this.store.set(user.getUserId(), this.clone(user));
      resolve();
    });
  }

  // TODO : 중복 리팩터링
  public findByName(userName: UserName): Promise<User | null> {
    const target = [...this.store.values()].find(
      user => user.getValues().name === userName.getValue()
    );

    return new Promise(resolve => resolve(target ? this.clone(target) : null));
  }

  // TODO : 중복 리팩터링
  public findById(userId: UserId): Promise<User | null> {
    const target = [...this.store.values()].find(
      user => user.getValues().id === userId.getValue()
    );

    return new Promise(resolve => resolve(target ? this.clone(target) : null));
  }

  private clone(user: User): User {
    return new User(user.getUserName(), user.getUserId());
  }
}