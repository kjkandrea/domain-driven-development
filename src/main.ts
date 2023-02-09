import {UserRepository} from 'user/repositories/UserRepository';
import {Program} from 'Program';

const program = new Program(new UserRepository());
program.createUser('karenina').then(console.log);
