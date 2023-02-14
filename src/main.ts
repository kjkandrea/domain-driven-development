import 'reflect-metadata';
import {
  UserDeleteService,
  UserRegisterService,
} from 'application/UserApplicationService';
import {TYPES} from 'types';
import {SqlConnectionUserDependencySetup} from 'serviceProvider/SqlConnectionUserDependencySetup';
import {Container} from 'inversify';

async function main() {
  const service = new Container();
  const userDependencySetup = new SqlConnectionUserDependencySetup();
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
