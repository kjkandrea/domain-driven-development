import {ICircleFactory} from 'circle/factories/CircleFactory';
import {ICircleRepository} from 'circle/repositories/ICircleRepository';
import {CircleService} from 'circle/services/CircleService';
import {IUserRepository} from 'user/repositories/UserRepository';
import {CircleCreateCommand} from 'circle/commands/CircleCreateCommand';
import {UserId} from 'user/values';
import {ExistError, NotFoundError} from 'global/error';
import {CircleName} from 'circle/values';

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

  public async create(command: CircleCreateCommand) {
    const ownerId = new UserId(command.userId);
    const owner = await this.userRepository.findById(ownerId);
    if (owner === null) {
      throw new NotFoundError(`${ownerId} : 서클장이 될 사용자 없음`);
    }

    const name = new CircleName(command.name);
    const circle = this.circleFactory.create(name, owner);
    const isExist = await this.circleService.exists(circle);
    if (isExist) {
      throw new ExistError(`${circle} : 이미 등록된 서클임`);
    }
    return this.circleRepository.save(circle);
  }
}
