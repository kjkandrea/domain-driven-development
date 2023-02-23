import {ICircleFactory} from 'circle/factories/CircleFactory';
import {ICircleRepository} from 'circle/repositories/ICircleRepository';
import {CircleService} from 'circle/serviecs/CircleService';
import {IUserRepository} from 'user/repositories/UserRepository';

export class CircleApplicationService {
  private readonly circleFactory: ICircleFactory;
  private readonly circleRepository: ICircleRepository;
  private readonly circleService: CircleService;
  private readonly userRepository: IUserRepository;

  constructor(
    circleFactory: ICircleFactory,
    circleRepository: ICircleRepository,
    circleService: CircleService,
    userRepository: IUserRepository
  ) {
    this.circleFactory = circleFactory;
    this.circleRepository = circleRepository;
    this.circleService = circleService;
    this.userRepository = userRepository;
  }
}
