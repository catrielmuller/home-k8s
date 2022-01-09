import * as k8s from '@pulumi/kubernetes';
import { dashboardValues } from './values';

type DashboardModuleArgs = {
  namespace: k8s.core.v1.Namespace;
};
export const dashboardModule = (args: DashboardModuleArgs) => {
  const { namespace } = args;
  return new k8s.helm.v3.Chart('system-dashboard', {
    namespace: namespace.metadata.name,
    chart: 'kubernetes-dashboard',
    version: '5.0.5',
    fetchOpts: {
      repo: 'https://kubernetes.github.io/dashboard/',
    },
    values: dashboardValues,
  });
};
