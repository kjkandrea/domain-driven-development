import {Container} from 'inversify';
import {
  IUserRepository,
  UserRepository,
} from 'user/repositories/UserRepository';
import {TYPES} from 'types';
import {
  UserDeleteService,
  UserRegisterService,
} from 'application/UserApplicationService';
import {UserService} from 'user/services/UserService';

const serviceCollection = new Container();
serviceCollection
  .bind<IUserRepository>(TYPES.IUserRepository)
  .to(UserRepository);
serviceCollection.bind(TYPES.UserService).to(UserService);
serviceCollection.bind(TYPES.UserRegisterService).to(UserRegisterService);
serviceCollection.bind(TYPES.UserDeleteService).to(UserDeleteService);
export {serviceCollection};
