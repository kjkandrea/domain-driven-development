import {UserRepository} from 'user/repositories/UserRepository';
import {UserApplicationService} from 'UserApplicationService';

const program = new UserApplicationService(new UserRepository());
program.createUser('karenina').then(console.log);
