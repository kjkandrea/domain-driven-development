import 'reflect-metadata';
import {UserRepository} from 'user/repositories/UserRepository';
import {
  UserDeleteService,
  UserRegisterService,
} from 'application/UserApplicationService';
import {TYPES} from 'types';
import {serviceCollection} from 'application/WebServer/serviceCollection';

async function main() {
  const userRepository = new UserRepository();

  // const userRegisterService = new UserRegisterService(
  //   userRepository,
  //   new UserService(userRepository)
  // );
  const userRegisterService = serviceCollection.get<UserRegisterService>(
    TYPES.UserRegisterService
  );
  const userDeleteService = new UserDeleteService(userRepository);

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
