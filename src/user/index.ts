import {FullName, FirstName, LastName, UserId} from './values';
import {User} from './User';

const user = new User(
  new UserId('a'),
  new FullName(new FirstName('Alexei'), new LastName('Karenin'))
);

user.changeFullName(
  new FullName(new FirstName('Anna'), new LastName('Karenina'))
);

console.log(user);
