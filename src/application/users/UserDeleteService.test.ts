import 'reflect-metadata';
import {User} from 'domain/models/users/User';
import {UserName, UserId} from 'domain/models/users';
import {UserDeleteService} from 'application/users/UserDeleteService';
import {Container} from 'inversify';
import {TYPES} from 'types';
import {IUserRepository} from 'domain/models/users';
import {userDependancySetupFactory} from 'DIContainer/userDependancySetupFactory';

describe('UserDeleteService', () => {
  const service = new Container();
  const userDependencySetup = userDependancySetupFactory('IN_MEMORY');
  userDependencySetup.run(service);
  const userDeleteService = service.get<UserDeleteService>(
    TYPES.UserDeleteService
  );
  const userRepository = service.get<IUserRepository>(TYPES.IUserRepository);

  const USER_NAME_VALUE = 'karenin';
  const USER_ID = 1;

  test('id 를 통해 저장된 유저의 정보를 삭제할 수 있다.', async () => {
    const user = new User(new UserName(USER_NAME_VALUE), new UserId(USER_ID));

    await userRepository.save(user);
    await userDeleteService.delete(USER_ID);
    await expect(
      userRepository.findById(new UserId(USER_ID))
    ).resolves.toBeNull();
  });
});
