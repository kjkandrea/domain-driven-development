import {Program} from 'Program';
import {InMemoryUserRepository} from 'user/repositories/UserRepository/InMemoryUserRepository';
import {UserName} from 'user/values';

describe('Program', () => {
  const userRepository = new InMemoryUserRepository();
  const program = new Program(userRepository);

  test('유저를 생성한 후 해당 유저를 레포지토리에서 읽을 수 있다.', async () => {
    const USER_NAME_VALUE = 'karenin';

    await program.createUser(USER_NAME_VALUE);
    const result = await userRepository.find(new UserName(USER_NAME_VALUE));
    expect(result?.getValues().userName).toBe(USER_NAME_VALUE);
  });
});
