import {verbose} from 'sqlite3';
import {UserName} from "user/values";

const sqlite3 = verbose();
const db = new sqlite3.Database('./my.db');

export class Program {
  private db = db;

  public createUser(name: UserName, next: (...args: any[]) => void) {
    this.createUserTable(() => {
      this.db.run(`INSERT INTO User (name) VALUES ('${name.getValue()}')`, next)
    })
  }

  public existUserName(name: UserName) {
    this.db.all(`SELECT EXISTS(SELECT 1 FROM User WHERE name="${name.getValue()}")`, console.log)
  }

  public reset() {
    this.db.run('DROP TABLE IF EXISTS User')
  }

  private createUserTable(next: () => void) {
    db.run("CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY, name TEXT)", next)
  }
}
