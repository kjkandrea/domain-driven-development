import {UserName} from './values';
import {UserId} from './values';

// 엔티티.
export class User {
  private readonly userId: UserId;
  private userName: UserName;

  constructor(userId: UserId, fullName: UserName) {
    this.userId = userId;
    this.userName = fullName;
  }

  public getUserName() {
    return this.userName
  }

  // 엔티티는 필요에 따라 속성을 가변으로 만든다.
  public changeName(userName: UserName) {
    this.userName = userName;
  }
}
