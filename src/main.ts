import {UserRepository} from 'user/repositories/UserRepository';
import {UserService} from 'user/services/UserService';
import {
  UserDeleteService,
  UserRegisterService,
} from 'application/UserApplicationService';

async function main() {
  const userRepository = new UserRepository();

  const userRegisterService = new UserRegisterService(
    userRepository,
    new UserService(userRepository)
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
