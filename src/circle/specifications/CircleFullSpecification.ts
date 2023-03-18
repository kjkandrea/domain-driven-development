import {IUserRepository} from 'user/repositories/UserRepository';
import {Circle} from 'domain/models/circles/Circle';

export class CircleFullSpecification {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async isSatisfiedBy(circle: Circle): Promise<boolean> {
    const findUsers = await Promise.all(
      circle.members.map(member =>
        this.userRepository.findById(member.getUserId())
      )
    );
    const {length: premiumUserCount} = findUsers.filter(user =>
      user?.isPremium()
    );
    // 기본 30명. 프리미엄 사용자가 10 명 이상 소속된 서클은 최대 인원이 50 명으로 늘어난다.
    const circleUpperLimit = premiumUserCount < 10 ? 30 : 50;

    return circle.countMembers() > circleUpperLimit;
  }
}
