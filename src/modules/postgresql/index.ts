import * as k8s from '@pulumi/kubernetes';
import { postgresqlValues } from './values';
import { postgresqlProvider } from './provider';
import { Config } from '../../configs';

export const postgresqlModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-postgresql-namespace`, {
    metadata: {
      name: `${Config.name}-postgresql`,
    },
  });

  const chart = new k8s.helm.v3.Chart(`${Config.name}-postgresql`, {
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
