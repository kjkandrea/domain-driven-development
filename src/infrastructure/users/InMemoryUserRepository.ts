import type {IUserRepository} from 'domain/models/users';
import {User} from 'domain/models/users/User';
import {UserName, UserId, UserLiteral} from 'domain/models/users';
import {ObjectValue} from 'global/abstracts/ObjectValue';
import {injectable} from 'inversify';

@injectable()
class InMemoryUserRepository implements IUserRepository {
  private store: Map<UserLiteral['id'], User> = new Map();

  public save(user: User): Promise<void> {
    return new Promise(resolve => {
      this.store.set(user.getValues().id, this.clone(user));
      resolve();
    });
  }

  public delete(user: User): Promise<void> {
    return new Promise(resolve => {
      this.store.delete(user.getValues().id);
      resolve();
    });
  }

  public getAll(): Promise<User[]> {
    return new Promise(resolve => resolve([...this.store.values()]));
  }

  public findByName(userName: UserName): Promise<User | null> {
    return this.findBy('name', userName);
  }

  public findById(userId: UserId): Promise<User | null> {
    return this.findBy('id', userId);
  }

  private findBy<ValueType>(
    key: keyof UserLiteral,
    objectValue: ObjectValue<ValueType>
  ): Promise<User | null> {
    const target = [...this.store.values()].find(
      user => user.getValues()[key] === objectValue.getValue()
    );

    return new Promise(resolve => resolve(target ? this.clone(target) : null));
  }

  private clone(user: User): User {
    return new User(user.getUserName(), user.getUserId());
  }
}

export {InMemoryUserRepository};
