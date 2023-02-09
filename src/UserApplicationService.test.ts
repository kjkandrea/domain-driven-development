import {UserApplicationService} from 'UserApplicationService';
import {InMemoryUserRepository} from 'user/repositories/UserRepository/InMemoryUserRepository';
import {UserName} from 'user/values';
import {UserService} from 'user/services/UserService';

describe('UserApplicationService', () => {
  const userRepository = new InMemoryUserRepository();
  const userService = new UserService(userRepository);
  const program = new UserApplicationService(userRepository, userService);

  test('유저를 생성한 후 해당 유저를 레포지토리에서 읽을 수 있다.', async () => {
    const USER_NAME_VALUE = 'karenin';

    await program.register(USER_NAME_VALUE);
    const result = await userRepository.findByName(
      new UserName(USER_NAME_VALUE)
    );
    expect(result?.getValues().name).toBe(USER_NAME_VALUE);
  });
});
