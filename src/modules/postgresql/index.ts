import * as k8s from '@pulumi/kubernetes';
import { postgresqlValues } from './values';
import { postgresqlProvider } from './provider';

type PostgresqlModuleArgs = {
  namespace: k8s.core.v1.Namespace;
};
export const postgresqlModule = (args: PostgresqlModuleArgs) => {
  const { namespace } = args;
  const chart = new k8s.helm.v3.Chart('system-postgresql', {
    namespace: namespace.metadata.name,
    chart: 'postgresql',
    version: '0.2.3',
    fetchOpts: {
      repo: 'https://cetic.github.io/helm-charts',
    },
    values: postgresqlValues,
  });
  const provider = postgresqlProvider({ chart });

  return {
    chart,
    provider,
  };
};
