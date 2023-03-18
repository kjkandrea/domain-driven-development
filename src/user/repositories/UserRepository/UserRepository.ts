import {User} from 'domain/models/users/User';
import {UserName, UserId, UserLiteral} from 'domain/models/users';
import {db} from 'db';
import type {IUserRepository} from 'user/repositories/UserRepository';
import {ObjectValue} from 'global/abstracts/ObjectValue';

import {injectable} from 'inversify';

@injectable()
export class UserRepository implements IUserRepository {
  private db = db;

  public async save(user: User): Promise<void> {
    const prevUser = await this.findById(user.getUserId());
    const exist = prevUser !== null;

    return new Promise(resolve =>
      exist
        ? this.db.run(
            `UPDATE users
              SET name = "${user.getValues().name}"
              WHERE id = "${user.getValues().id}"
            `,
            () => resolve()
          )
        : this.db.run(
            `INSERT INTO users (name) VALUES ('${user
              .getUserName()
              .getValue()}')`,
            () => resolve()
          )
    );
  }

  public delete(user: User): Promise<void> {
    return new Promise(resolve =>
      this.db.run(`DELETE FROM users WHERE id=${user.getValues().id}`, () =>
        resolve()
      )
    );
  }

  public getAll(): Promise<User[]> {
    return new Promise(resolve =>
      this.db.all('SELECT * FROM users', (_, users) =>
        resolve(
          users.map(
            user => new User(new UserName(user.name), new UserId(user.id))
          )
        )
      )
    );
  }

  public async findByName(userName: UserName): Promise<User | null> {
    return this.findBy('name', userName);
  }

  public findById(userId: UserId): Promise<User | null> {
    return this.findBy('id', userId);
  }

  private findBy<ValueType>(
    key: keyof UserLiteral,
    objectValue: ObjectValue<ValueType>
  ): Promise<User | null> {
    return new Promise(resolve =>
      this.db.all(
        `SELECT * FROM users WHERE ${key}="${objectValue.getValue()}"`,
        (_, [user]) => {
          if (!user) {
            resolve(null);
            return;
          }
          const {name, id} = user;
          resolve(new User(new UserName(name), new UserId(id)));
        }
      )
    );
  }

  // table 정리용
  // public reset() {
  //   this.db.run('DROP TABLE IF EXISTS users');
  // }
  //
  // private createUsersTable(): Promise<void> {
  //   return new Promise(resolve =>
  //     db.run(
  //       'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)',
  //       () => resolve()
  //     )
  //   );
  // }
}
