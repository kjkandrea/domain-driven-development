import {UserRepository} from 'user/repositories/UserRepository';
import {UserService} from 'user/services/UserService';
import {UserApplicationService} from 'UserApplicationService';

const userRepository = new UserRepository();
const program = new UserApplicationService(
  userRepository,
  new UserService(userRepository)
);

// program.register('karenina').then(console.log);

program.get(1).then(console.log);
