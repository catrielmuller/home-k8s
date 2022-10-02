import * as k8s from '@pulumi/kubernetes';
import { Config } from '../../configs';
import { prometheusValues } from './values';

export const prometheusModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}prometheus-namespace`, {
    metadata: {
      name: `${Config.name}-prometheus`,
    },
  });

  return new k8s.helm.v3.Chart(`${Config.name}-prometheus`, {
    namespace: namespace.metadata.name,
    chart: 'prometheus',
    version: '15.14.0',
    fetchOpts: {
      repo: 'https://prometheus-community.github.io/helm-charts',
    },
    values: prometheusValues,
  });
};
