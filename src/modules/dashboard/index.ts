import * as k8s from '@pulumi/kubernetes';
import { Config } from '../../configs';
import { dashboardValues } from './values';

export const dashboardModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-dashboard-namespace`, {
    metadata: {
      name: `${Config.name}-dashboard`,
    },
  });

  return new k8s.helm.v3.Chart(`${Config.name}-dashboard`, {
    namespace: namespace.metadata.name,
    chart: 'kubernetes-dashboard',
    version: '5.11.0',
    fetchOpts: {
      repo: 'https://kubernetes.github.io/dashboard/',
    },
    values: dashboardValues,
  });
};
