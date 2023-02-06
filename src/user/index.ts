import {FullName, FirstName, LastName} from './values';

const fullName = new FullName(new FirstName('ka'), new LastName('renin'));

console.log(fullName.toString());
