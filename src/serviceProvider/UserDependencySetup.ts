import {Container} from 'inversify';

export abstract class UserDependencySetup {
  public run(service: Container): void {
    this.setupRepositories(service);
    this.setupApplicationService(service);
    this.setupDomainService(service);
  }

  protected abstract setupRepositories(service: Container): void;
  protected abstract setupApplicationService(service: Container): void;
  protected abstract setupDomainService(service: Container): void;
}
