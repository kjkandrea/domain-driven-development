// 엔티티.
import {FullName} from './values';
import {UserId} from './values';

export class User {
  private readonly userId: UserId;
  private fullName: FullName;

  constructor(userId: UserId, fullName: FullName) {
    this.userId = userId;
    this.fullName = fullName;
  }

  public changeFullName(fullName = this.fullName) {
    this.fullName = fullName;
  }
}
