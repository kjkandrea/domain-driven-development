import {UserName} from './values';
import {Program} from "repositories";

const program = new Program()
program.createUser(new UserName('karenin')).then(console.log)
