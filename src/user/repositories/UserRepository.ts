import {User} from 'user/entities/User';
import {UserName, UserId} from 'user/values';
import {db} from 'db';

export interface IUserRepository {
  save(user: User): Promise<void>;
  find(userName: UserName): Promise<User | null>;

  // 레포지토리의 책임은 퍼시스턴시 까지이다. 사용자명의 중복 확인은 도메인 규칙에 가깝다.
  // exists(user: User): Promise<boolean>
}

export class UserRepository implements IUserRepository {
  private db = db;

  public async save(user: User): Promise<void> {
    const prevUser = await this.find(user.getUserName());
    const exist = prevUser !== null;

    return new Promise(resolve =>
      exist
        ? this.db.run(
            `UPDATE users
              SET name = "${user.getValues().userName}"
              WHERE id = "${user.getValues().userId}"
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

  public async find(userName: UserName): Promise<User | null> {
    return new Promise(resolve =>
      this.db.all(
        `SELECT * FROM users WHERE name="${userName.getValue()}"`,
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
