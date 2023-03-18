import {UserName} from 'user/values';
import {UserId} from 'user/values/UserId';

// 엔티티.
export class User {
  private userName: UserName;
  private readonly userId: UserId;

  constructor(userName: UserName, userId?: UserId) {
    this.userName = userName;
    this.userId = userId ?? new UserId(-1);
  }

  public getUserName(): UserName {
    return this.userName;
  }

  public getUserId(): UserId {
    return this.userId;
  }

  public getValues() {
    return {
      name: this.userName.getValue(),
      id: this.userId.getValue(),
    };
  }

  // 엔티티는 필요에 따라 속성을 가변으로 만든다.
  public changeName(userName: UserName) {
    this.userName = userName;
  }

  public isPremium(): boolean {
    return Math.random() < 0.5;
  }
}
