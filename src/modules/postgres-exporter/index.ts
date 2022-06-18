import * as k8s from '@pulumi/kubernetes';
import { Config } from '../../configs';
import { postgresExporterValues } from './values';

export const postgresExporterModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-postgres-exporter`, {
    metadata: {
      name: `${Config.name}-postgres-exporter`,
    },
  });

  return new k8s.helm.v3.Chart(`${Config.name}-postgres-exporter`, {
    namespace: namespace.metadata.name,
    chart: 'prometheus-postgres-exporter',
    version: '2.8.0',
    fetchOpts: {
      repo: 'https://prometheus-community.github.io/helm-charts',
    },
    values: postgresExporterValues,
  });
};
