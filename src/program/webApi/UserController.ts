import {
  UserDeleteService,
  UserRegisterService,
} from 'application/UserApplicationService';
import {Express} from 'express';

export class UserController {
  private readonly userRegisterService: UserRegisterService;
  private readonly userDeleteService: UserDeleteService;
  private readonly app: Express;

  constructor(
    userRegisterService: UserRegisterService,
    userDeleteService: UserDeleteService,
    app: Express
  ) {
    this.userRegisterService = userRegisterService;
    this.userDeleteService = userDeleteService;
    this.app = app;

    this.initHttpRoute();
  }

  private initHttpRoute() {
    this.app.get('/users', (_, res) => {
      this.userRegisterService.getAll().then(users => res.send(users));
    });

    this.app.get('/users/:userId', (req, res) => {
      const userId = Number(req.params);
      this.userRegisterService.get(userId).then(user => {
        console.log(user);
        res.send(user);
      });
    });
  }
}
