import {User} from 'user/entities/User';
import {UserName, UserId, UserData} from 'user/values';
import {db} from 'db';
import type {IUserRepository} from 'user/repositories/UserRepository';
import {ObjectValue} from 'global/abstracts/ObjectValue';

export class UserRepository implements IUserRepository {
  private db = db;

  public async save(user: User): Promise<void> {
    const prevUser = await this.findByName(user.getUserName());
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

  public async findByName(userName: UserName): Promise<User | null> {
    return this.findBy('name', userName);
  }

  public findById(userId: UserId): Promise<User | null> {
    return this.findBy('id', userId);
  }

  private findBy<ValueType>(
    key: keyof UserData,
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
