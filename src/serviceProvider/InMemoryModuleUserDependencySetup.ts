import {UserDependencySetup} from 'serviceProvider/UserDependencySetup';
import {Container} from 'inversify';
import {TYPES} from 'types';
import {InMemoryUserRepository} from 'infrastructure/users/InMemoryUserRepository';
import {UserDeleteService, UserRegisterService} from 'application/users';
import {UserService} from 'domain/services/UserService';

export class InMemoryModuleUserDependencySetup extends UserDependencySetup {
  protected setupRepositories(service: Container) {
    service
      .bind(TYPES.IUserRepository)
      .to(InMemoryUserRepository)
      .inSingletonScope();
  }

  protected setupApplicationService(service: Container) {
    service.bind(TYPES.UserRegisterService).to(UserRegisterService);
    service.bind(TYPES.UserDeleteService).to(UserDeleteService);
  }

  protected setupDomainService(service: Container) {
    service.bind(TYPES.UserService).to(UserService);
  }
}
