import {Circle} from 'domain/models/circles/Circle';
import {CircleId, CircleName} from 'domain/models/circles';

export interface ICircleRepository {
  save(circle: Circle): Promise<void>;
  findById(circleId: CircleId): Promise<Circle | null>;
  findByName(circleName: CircleName): Promise<Circle | null>;
}
