import {User} from "user/entities/User";
import {UserName} from "user/values";

export interface IUserRepository {
  save(user: User): Promise<void>
  find(userName: UserName): Promise<User>
  exists(user: User): Promise<boolean>
}
