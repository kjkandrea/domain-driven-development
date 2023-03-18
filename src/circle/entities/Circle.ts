import {CircleName} from 'circle/values';
import {CircleId} from 'circle/values';
import {User} from 'user/entities/User';
import {ExistError} from '../../global/error';

export class Circle {
  private circleName: CircleName;
  private readonly circleId: CircleId;
  private owner: User;
  public readonly members: User[];

  constructor(
    circleName: CircleName,
    circleId: CircleId,
    owner: User,
    members: User[]
  ) {
    this.circleName = circleName;
    this.circleId = circleId;
    this.owner = owner;
    this.members = members;
  }

  public getCircleName(): CircleName {
    return this.circleName;
  }

  public getCircleId(): CircleId {
    return this.circleId;
  }

  public changeCircleName(circleName: CircleName): void {
    this.circleName = circleName;
  }

  public join(member: User) {
    if (this.isFull()) {
      throw new ExistError('사용자 한도 초과');
    }
    this.members.push(member);
  }

  public isFull() {
    return this.countMembers() >= 30;
  }

  private countMembers() {
    return this.members.length + 1;
  }
}
