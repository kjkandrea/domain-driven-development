import {ICircleRepository} from 'circle/repositories/ICircleRepository';
import {Circle} from 'circle/entities/Circle';

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
