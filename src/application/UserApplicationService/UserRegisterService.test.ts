import 'reflect-metadata';
import {UserRegisterService} from 'application/UserApplicationService/UserRegisterService';
import {User} from 'domain/models/users/User';
import {UserName, UserId} from 'domain/models/users';
import {Container} from 'inversify';
import {TYPES} from 'types';
import {IUserRepository} from 'user/repositories/UserRepository';
import {userDependancySetupFactory} from 'serviceProvider/userDependancySetupFactory';

describe('UserRegisterService', () => {
  const service = new Container();
  const userDependencySetup = userDependancySetupFactory('IN_MEMORY');
  userDependencySetup.run(service);
  const userRegisterService = service.get<UserRegisterService>(
    TYPES.UserRegisterService
  );
  const userRepository = service.get<IUserRepository>(TYPES.IUserRepository);

  const USER_NAME_VALUE = 'karenin';
  const USER_ID = 1;

  test('유저를 생성한 후 해당 유저를 레포지토리에서 읽을 수 있다.', async () => {
    await userRegisterService.register(USER_NAME_VALUE);
    const result = await userRepository.findByName(
      new UserName(USER_NAME_VALUE)
    );
    expect(result?.getValues().name).toBe(USER_NAME_VALUE);
  });

  test('id 를 통해 저장된 유저 정보를 조회할 수 있다.', async () => {
    const user = new User(new UserName(USER_NAME_VALUE), new UserId(USER_ID));

    await userRepository.save(user);
    await expect(userRegisterService.get(USER_ID)).resolves.toEqual(
      user.getValues()
    );
  });

  test('저장된 모든 유저의 정보를 조회할 수 있다', async () => {
    const user = new User(new UserName(USER_NAME_VALUE), new UserId(USER_ID));

    await userRepository.save(user);
    const result = await userRegisterService.getAll();
    expect(
      result.some(({name, id}) => name === USER_NAME_VALUE && id === USER_ID)
    ).toBe(true);
  });

  test('id 를 통해 저장된 유저의 정보를 수정할 수 있다.', async () => {
    const user = new User(new UserName(USER_NAME_VALUE), new UserId(USER_ID));

    await userRepository.save(user);

    const NEW_USER_NAME_VALUE = 'kareninano';
    const NEW_USER_DATA = {
      id: USER_ID,
      name: NEW_USER_NAME_VALUE,
    };
    await userRegisterService.update(NEW_USER_DATA);
    await expect(userRegisterService.get(USER_ID)).resolves.toEqual(
      NEW_USER_DATA
    );
  });
});
