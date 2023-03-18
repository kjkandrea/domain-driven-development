import {ICircleFactory} from 'application/circles/ICircleFactory';
import {ICircleRepository} from 'domain/models/circles';
import {CircleService} from 'domain/services/CircleService';
import {IUserRepository} from 'domain/models/users';
import {CircleCreateCommand} from 'application/circles/CircleCreateCommand';
import {UserId} from 'domain/models/users';
import {ExistError, NotFoundError} from 'global/error';
import {CircleId, CircleName} from 'domain/models/circles';
import {CircleJoinCommand} from 'application/circles/CircleJoinCommand';
import {CircleFullSpecification} from 'domain/models/circles';

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

  public async join(command: CircleJoinCommand) {
    const memberId = new UserId(command.userId);
    const member = await this.userRepository.findById(memberId);
    if (!member) {
      throw new NotFoundError('서클에 가입할 사용자를 찾지 못했음');
    }
    const id = new CircleId(command.circleId);
    const circle = await this.circleRepository.findById(id);
    if (!circle) {
      throw new NotFoundError('가입할 서클을 찾지 못했음');
    }

    const circleFullSpecification = new CircleFullSpecification(
      this.userRepository
    );

    const can = await circleFullSpecification.isSatisfiedBy(circle);
    if (!can) {
      throw new ExistError('사용자 한도 초과');
    }

    circle.join(member);
    return this.circleRepository.save(circle);
  }
}
