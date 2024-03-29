import {Container} from 'inversify';
import {UserDependencySetup} from 'DIContainer/UserDependencySetup';
import {TYPES} from 'types';
import {UserRepository} from 'infrastructure/users';
import {UserDeleteService, UserRegisterService} from 'application/users';
import {UserService} from 'domain/services/UserService';

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
