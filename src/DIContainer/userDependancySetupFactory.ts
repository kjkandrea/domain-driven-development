import {DependencySetupType} from 'DIContainer/types';
import {UserDependencySetup} from 'DIContainer/UserDependencySetup';
import {InMemoryModuleUserDependencySetup} from 'DIContainer/InMemoryModuleUserDependencySetup';
import {SqlConnectionUserDependencySetup} from 'DIContainer/SqlConnectionUserDependencySetup';

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
