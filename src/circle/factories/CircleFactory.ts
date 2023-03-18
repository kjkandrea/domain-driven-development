import {CircleName} from 'circle/values';
import {User} from 'domain/models/users/User';
import {Circle} from 'circle/entities/Circle';

export interface ICircleFactory {
  create(name: CircleName, owner: User): Circle;
}
