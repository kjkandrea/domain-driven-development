import {Container} from 'inversify';
import {UserDependencySetup} from 'serviceProvider/UserDependencySetup';
import {TYPES} from 'types';
import {UserRepository} from 'user/repositories/UserRepository';
import {
  UserDeleteService,
  UserRegisterService,
} from 'application/UserApplicationService';
import {UserService} from 'user/services/UserService';

export class SqlConnectionUserDependencySetup extends UserDependencySetup {
  protected setupRepositories(service: Container) {
    service.bind(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
  }

  protected setupApplicationService(service: Container) {
    service.bind(TYPES.UserRegisterService).to(UserRegisterService);
    service.bind(TYPES.UserDeleteService).to(UserDeleteService);
  }

  protected setupDomainService(service: Container) {
    service.bind(TYPES.UserService).to(UserService);
  }
}
