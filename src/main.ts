import './user/index.ts';
import {db} from "db";
import {UserName} from "user/values";
import {ExistError} from "global/error";
import {UserService} from "user/services/UserService";
import {UserRepository} from "user/repositories/UserRepository";
import {User} from "user/entities/User";

export class Program {
  private db = db;

  public async createUser(userName: string): Promise<void> {
    await this.createUserTable();

    const user = new User(new UserName(userName))
    const userService = new UserService(new UserRepository())

    const allReadyExist = await userService.exists(user)
    if (allReadyExist) throw new ExistError('이미 존재하는 UserName 입니다.')
    return new Promise(resolve => {
      this.db.run(`INSERT INTO User (name) VALUES ('${user.getUserName().getValue()}')`, () => resolve())
    });
  }


  public reset() {
    this.db.run('DROP TABLE IF EXISTS User')
  }

  private createUserTable(): Promise<void> {
    return new Promise(resolve => db.run("CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY, name TEXT)", () => resolve()));
  }
}

const program = new Program()
program.createUser('karenin').then(console.log)


