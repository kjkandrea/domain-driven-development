import {CircleName} from 'domain/models/circles';
import {User} from 'domain/models/users/User';
import {Circle} from 'domain/models/circles/Circle';

export interface ICircleFactory {
  create(name: CircleName, owner: User): Circle;
}
