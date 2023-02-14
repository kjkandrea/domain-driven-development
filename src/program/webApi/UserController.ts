import {
  UserDeleteService,
  UserRegisterService,
} from 'application/UserApplicationService';

export class UserController {
  private readonly userRegisterService: UserRegisterService;
  private readonly userDeleteService: UserDeleteService;

  constructor(
    userRegisterService: UserRegisterService,
    userDeleteService: UserDeleteService
  ) {
    this.userRegisterService = userRegisterService;
    this.userDeleteService = userDeleteService;
  }
}
