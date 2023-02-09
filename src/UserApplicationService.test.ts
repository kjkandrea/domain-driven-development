import {UserApplicationService} from 'UserApplicationService';
import {InMemoryUserRepository} from 'user/repositories/UserRepository/InMemoryUserRepository';
import {User} from 'user/entities/User';
import {UserName, UserId} from 'user/values';
import {UserService} from 'user/services/UserService';

describe('UserApplicationService', () => {
  const userRepository = new InMemoryUserRepository();
  const userService = new UserService(userRepository);
  const userApplicationService = new UserApplicationService(
    userRepository,
    userService
  );

  const USER_NAME_VALUE = 'karenin';

  test('유저를 생성한 후 해당 유저를 레포지토리에서 읽을 수 있다.', async () => {
    await userApplicationService.register(USER_NAME_VALUE);
    const result = await userRepository.findByName(
      new UserName(USER_NAME_VALUE)
    );
    expect(result?.getValues().name).toBe(USER_NAME_VALUE);
  });

  test('id 를 통해 저장된 유저 정보를 조회할 수 있다.', async () => {
    const USER_ID = 1;

    const user = new User(new UserName(USER_NAME_VALUE), new UserId(USER_ID));

    await userRepository.save(user);
    await expect(userApplicationService.get(USER_ID)).resolves.toEqual(
      user.getValues()
    );
  });
});
