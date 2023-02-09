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

  public find(userName: UserName): Promise<User | null> {
    const target = [...this.store.values()].find(
      user => user.getValues().userName === userName.getValue()
    );

    return new Promise(resolve => resolve(target ?? null));
  }

  private clone(user: User): User {
    return new User(user.getUserName(), user.getUserId());
  }
}
