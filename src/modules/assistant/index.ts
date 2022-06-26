import * as k8s from '@pulumi/kubernetes';
import * as postgresql from '@pulumi/postgresql';
import { assistantValues } from './values';
import { Config } from '../../configs';

type AssistantModuleArgs = {
  databaseProvider: postgresql.Provider;
};

export const assistantModule = (args: AssistantModuleArgs) => {
  const { databaseProvider } = args;

  const namespace = new k8s.core.v1.Namespace(`${Config.name}-assistant-namespace`, {
    metadata: {
      name: `${Config.name}-assistant`,
    },
  });

  const database = new postgresql.Database(
    `${Config.name}-assistant-db`,
    {
      allowConnections: true,
      name: `${Config.name}-assistant`,
      owner: Config.postgresql.username,
    },
    {
      provider: databaseProvider,
    }
  );

  const chart = new k8s.helm.v3.Chart(`${Config.name}-assistant`, {
    namespace: namespace.metadata.name,
    chart: 'home-assistant',
    version: '13.2.0',
    fetchOpts: {
      repo: 'https://k8s-at-home.com/charts/',
    },
    values: assistantValues,
  });

  return {
    database,
    chart,
  };
};
