import {InMemoryUserRepository} from 'user/repositories/UserRepository/InMemoryUserRepository';
import {User} from 'user/entities/User';
import {UserName, UserId} from 'user/values';
import {UserDeleteService} from 'application/UserApplicationService/UserDeleteService';

describe('UserDeleteService', () => {
  const userRepository = new InMemoryUserRepository();
  const userDeleteService = new UserDeleteService(userRepository);

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
