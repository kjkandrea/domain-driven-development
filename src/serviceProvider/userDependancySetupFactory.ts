import {DependencySetupType} from 'serviceProvider/types';
import {UserDependencySetup} from 'serviceProvider/UserDependencySetup';
import {InMemoryModuleUserDependencySetup} from 'serviceProvider/InMemoryModuleUserDependencySetup';
import {SqlConnectionUserDependencySetup} from 'serviceProvider/SqlConnectionUserDependencySetup';

export function userDependancySetupFactory(
  dependencySetupType: DependencySetupType
): UserDependencySetup {
  switch (dependencySetupType) {
    case 'IN_MEMORY':
      return new InMemoryModuleUserDependencySetup();
    case 'SQL_CONNECTION':
      return new SqlConnectionUserDependencySetup();
  }
}
