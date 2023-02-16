import 'reflect-metadata';
import {Container} from 'inversify';
import {userDependancySetupFactory} from 'serviceProvider/userDependancySetupFactory';
import {
  UserRegisterService,
  UserDeleteService,
} from 'application/UserApplicationService';
import {TYPES} from 'types';

export async function main() {
  const service = new Container();
  const userDependencySetup = userDependancySetupFactory('SQL_CONNECTION');
  userDependencySetup.run(service);

  const userRegisterService = service.get<UserRegisterService>(
    TYPES.UserRegisterService
  );

  const userDeleteService = service.get<UserDeleteService>(
    TYPES.UserDeleteService
  );

  // 무결성 검증을 위해 사용자명 중복생성 시도
  // eslint-disable-next-line node/no-unsupported-features/es-builtins
  Promise.allSettled([
    userRegisterService.register('naruse'),
    userRegisterService.register('naruse'),
  ])
    .then(() => userRegisterService.getAll())
    .then(allUsers => allUsers.filter(({name}) => name === 'naruse'))
    .then(users => {
      return users;
    })
    .then(users => {
      return Promise.all(
        users.map(({id}) => userDeleteService.delete(id))
      ).then(() => users);
    })
    .then(users => {
      console.log(users);
      if (users.length === 2) {
        console.warn(
          '테스트 실패 : 데이터베이스에 생성 도중 즉시 유저를 생성하면 유저 이름이 중복되는 경우가 있습니다.'
        );
      } else {
        console.log('테스트 성공');
      }
    });
}
