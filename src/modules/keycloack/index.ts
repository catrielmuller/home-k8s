import * as k8s from '@pulumi/kubernetes';
import * as postgresql from '@pulumi/postgresql';
import { keycloakValues } from './values';
import { keycloakDatabase } from './database';
import { keycloakSetup } from './setup';
import { Config } from '../../configs';

type KeycloakModuleArgs = {
  databaseProvider: postgresql.Provider;
};
export const keycloakModule = (args: KeycloakModuleArgs) => {
  const { databaseProvider } = args;

  const namespace = new k8s.core.v1.Namespace(`${Config.name}-keycloak-namespace`, {
    metadata: {
      name: `${Config.name}-keycloak`,
    },
  });

  const database = keycloakDatabase({ provider: databaseProvider });
  const chart = new k8s.helm.v3.Chart(
    `${Config.name}-keycloak`,
    {
      namespace: namespace.metadata.name,
      chart: 'keycloak',
      version: '15.1.3',
      fetchOpts: {
        repo: 'https://catrielmuller.github.io/codecentric-helm-charts',
      },
      values: keycloakValues,
    },
    {
      dependsOn: [database],
    }
  );
  const keycloak = keycloakSetup({ chart });

  return {
    database,
    chart,
    keycloak,
  };
};
