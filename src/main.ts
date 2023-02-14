import 'reflect-metadata';
import {
  UserDeleteService,
  UserRegisterService,
} from 'application/UserApplicationService';
import {TYPES} from 'types';
import {Container} from 'inversify';
import {userDependancySetupFactory} from 'serviceProvider/userDependancySetupFactory';

async function main() {
  const service = new Container();
  const userDependencySetup = userDependancySetupFactory('SQL_CONNECTION');
  userDependencySetup.run(service);

  const userRegisterService = await service.get<UserRegisterService>(
    TYPES.UserRegisterService
  );
  const userDeleteService = await service.get<UserDeleteService>(
    TYPES.UserDeleteService
  );

  const user = await userRegisterService.get(1);
  if (!user) return;
  try {
    await userRegisterService.update({
      ...user,
      name: 'karenin',
    });
  } catch (e) {
    console.log('에러 무시 : 유저 이름 안바뀌어도 괜찮아..');
  }
  userRegisterService.get(1).then(console.log);
  userDeleteService.delete(3).then(() => console.log('id 3 user deleted'));
}

main();
