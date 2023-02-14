import 'reflect-metadata';
import {User} from 'user/entities/User';
import {UserName, UserId} from 'user/values';
import {UserDeleteService} from 'application/UserApplicationService/UserDeleteService';
import {Container} from 'inversify';
import {InMemoryModuleUserDependencySetup} from 'serviceProvider/InMemoryModuleUserDependencySetup';
import {TYPES} from 'types';
import {IUserRepository} from 'user/repositories/UserRepository';

describe('UserDeleteService', () => {
  const service = new Container();
  const userDependencySetup = new InMemoryModuleUserDependencySetup();
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
