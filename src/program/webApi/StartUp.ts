import 'reflect-metadata';
import {Container} from 'inversify';
import {userDependancySetupFactory} from 'DIContainer/userDependancySetupFactory';
import {UserDeleteService, UserRegisterService} from 'application/users';
import {TYPES} from 'types';
import {UserController} from 'program/webApi/UserController';
import * as express from 'express';
import {Express} from 'express';

export class StartUp {
  constructor() {
    const service = this.configureService();
    const app = this.configureApp();
    this.addController(service, app);
  }

  private configureService() {
    const service = new Container();
    const userDependencySetup = userDependancySetupFactory('SQL_CONNECTION');
    userDependencySetup.run(service);

    return service;
  }

  private configureApp(): Express {
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.listen(port, () => {
      console.log(`Web API listening on port ${port}`);
    });

    return app;
  }

  private addController(service: Container, app: Express) {
    new UserController(
      service.get<UserRegisterService>(TYPES.UserRegisterService),
      service.get<UserDeleteService>(TYPES.UserDeleteService),
      app
    );
  }
}
