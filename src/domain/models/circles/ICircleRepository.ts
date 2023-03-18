import {Circle} from '.';
import {CircleId, CircleName} from '.';

export interface ICircleRepository {
  save(circle: Circle): Promise<void>;
  findById(circleId: CircleId): Promise<Circle | null>;
  findByName(circleName: CircleName): Promise<Circle | null>;
}
