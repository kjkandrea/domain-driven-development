import {UserRepository} from 'user/repositories/UserRepository';
import {UserService} from 'user/services/UserService';
import {UserApplicationService} from 'application/UserApplicationService/UserApplicationService';

async function main() {
  const userRepository = new UserRepository();

  const program = new UserApplicationService(
    userRepository,
    new UserService(userRepository)
  );

  const user = await program.get(1);
  if (!user) return;
  try {
    await program.update({
      ...user,
      name: 'karenin',
    });
  } catch (e) {
    console.log('에러 무시 : 유저 이름 안바뀌어도 괜찮아..');
  }
  program.get(1).then(console.log);
  program.delete(3).then(() => console.log('id 3 user deleted'));
}

main();
