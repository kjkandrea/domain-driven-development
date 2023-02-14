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
  }
}
