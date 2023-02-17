import {Circle} from 'circle/entities/Circle';
import {CircleId, CircleName} from 'circle/values';

export interface ICircleRepository {
  save(circle: Circle): Promise<void>;
  findById(circleId: CircleId): Promise<Circle | null>;
  findByName(circleName: CircleName): Promise<Circle | null>;
}
