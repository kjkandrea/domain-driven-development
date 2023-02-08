import {User} from "user/entities/User";
import {UserName, UserId} from "user/values";
import {db} from "db";

export interface IUserRepository {
  // save(user: User): Promise<void>
  find(userName: UserName): Promise<User | null>

  // 레포지토리의 책임은 퍼시스턴시 까지이다. 사용자명의 중복 확인은 도메인 규칙에 가깝다.
  // exists(user: User): Promise<boolean>
}

export class UserRepository implements IUserRepository {
  private db = db;

  find(userName: UserName): Promise<User | null> {
    return new Promise(resolve => this.db.all(`SELECT * FROM User WHERE name="${userName.getValue()}"`, (_, [user]) => {
      if (!user) resolve(null)
      const { name, id } = user
      resolve(new User(new UserName(name), new UserId(id)))
    }))
  }
}
