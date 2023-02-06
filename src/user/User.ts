import {FullName} from './values';
import {UserId} from './values';

// 엔티티.
export class User {
  private readonly userId: UserId;
  private fullName: FullName;

  constructor(userId: UserId, fullName: FullName) {
    this.userId = userId;
    this.fullName = fullName;
  }

  // 엔티티는 필요에 따라 속성을 가변으로 만든다.
  public changeFullName(fullName = this.fullName) {
    this.fullName = fullName;
  }
}
