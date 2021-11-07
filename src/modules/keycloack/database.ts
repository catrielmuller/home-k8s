import * as postgresql from '@pulumi/postgresql';
import { Config } from '../../configs';

type KeycloakDatabaseArgs = {
  provider: postgresql.Provider;
};

export const keycloakDatabase = (args: KeycloakDatabaseArgs) => {
  const { provider } = args;
  return new postgresql.Database(
    `system-keycloak-db`,
    {
      allowConnections: true,
      name: 'system-keycloak',
      owner: Config.postgresql.username,
    },
    {
      provider: provider,
    }
  );
};
