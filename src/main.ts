import {UserRepository} from 'user/repositories/UserRepository';
import {UserService} from 'user/services/UserService';
import {UserApplicationService} from 'UserApplicationService';

async function main() {
  const userRepository = new UserRepository();

  const program = new UserApplicationService(
    userRepository,
    new UserService(userRepository)
  );

  const user = await program.get(1);
  if (!user) return;
  await program.update({
    ...user,
    name: 'kareninano',
  });
  program.get(1).then(console.log);
}

main();
