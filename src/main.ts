import './user/index.ts';
import {db} from "db";
import {UserName} from "user/values";
import {ExistError} from "global/error";

export class Program {
  private db = db;

  public async createUser(name: UserName): Promise<void> {
    await this.createUserTable();
    const allReadyExist = await this.existUserName(name)
    if (allReadyExist) throw new ExistError('이미 존재하는 UserName 입니다.')
    return new Promise(resolve => {
      this.db.run(`INSERT INTO User (name) VALUES ('${name.getValue()}')`, () => resolve())
    });
  }

  private existUserName(name: UserName): Promise<boolean> {
    return new Promise(resolve => this.db.all(`SELECT EXISTS(SELECT 1 FROM User WHERE name="${name.getValue()}")`, (_, result: [{ [query: string]: number }]) => {
      const resultCount = Object.values(result[0])[0]
      resolve(resultCount > 0)
    }))

  }

  public reset() {
    this.db.run('DROP TABLE IF EXISTS User')
  }

  private createUserTable(): Promise<void> {
    return new Promise(resolve => db.run("CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY, name TEXT)", () => resolve()));
  }
}

const program = new Program()
program.createUser(new UserName('karenin')).then(console.log)


