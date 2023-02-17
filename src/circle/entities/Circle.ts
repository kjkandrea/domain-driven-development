import {CircleName} from 'circle/values/CircleName';
import {CircleId} from 'circle/values/CircleId';
import {User} from 'user/entities/User';

export class Circle {
  private circleName: CircleName;
  private readonly circleId: CircleId;
  private owner: User;
  private members: User[];

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
}
