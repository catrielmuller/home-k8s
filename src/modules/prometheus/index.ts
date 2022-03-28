import * as k8s from '@pulumi/kubernetes';
import { prometheusValues } from './values';

type PrometheusArgs = {
  namespace: k8s.core.v1.Namespace;
};
export const prometheusModule = (args: PrometheusArgs) => {
  const { namespace } = args;
  return new k8s.helm.v3.Chart('system-prometheus', {
    namespace: namespace.metadata.name,
    chart: 'prometheus',
    version: '15.6.0',
    fetchOpts: {
      repo: 'https://prometheus-community.github.io/helm-charts',
    },
    values: prometheusValues,
  });
};
