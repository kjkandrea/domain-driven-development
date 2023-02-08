import {UserName} from 'user/values';
import {UserId} from "user/values/UserId";

// 엔티티.
export class User {
  private userName: UserName;
  private readonly userId: UserId;

  constructor(userName: UserName, userId?: UserId) {
    this.userName = userName;
    this.userId = userId ?? new UserId(-1);
  }

  public getUserName() {
    return this.userName
  }

  // 엔티티는 필요에 따라 속성을 가변으로 만든다.
  public changeName(userName: UserName) {
    this.userName = userName;
  }
}
