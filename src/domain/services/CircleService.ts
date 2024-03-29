import {ICircleRepository} from 'domain/models/circles/ICircleRepository';
import {Circle} from 'domain/models/circles';

export class CircleService {
  private readonly circleRepository: ICircleRepository;

  constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }

  public async exists(circle: Circle): Promise<boolean> {
    const duplicated = await this.circleRepository.findByName(
      circle.getCircleName()
    );
    return duplicated !== null;
  }
}
