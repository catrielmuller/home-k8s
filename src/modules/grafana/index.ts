import * as k8s from '@pulumi/kubernetes';
import { Config } from '../../configs';
import { grafanaValues } from './values';

export const grafanaModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-grafana-namespace`, {
    metadata: {
      name: `${Config.name}-grafana`,
    },
  });

  return new k8s.helm.v3.Chart(`${Config.name}-grafana`, {
    namespace: namespace.metadata.name,
    chart: 'grafana',
    version: '6.24.1',
    fetchOpts: {
      repo: 'https://grafana.github.io/helm-charts',
    },
    values: grafanaValues,
  });
};
