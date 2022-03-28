import * as k8s from '@pulumi/kubernetes';
import { grafanaValues } from './values';

type GrafanaArgs = {
  namespace: k8s.core.v1.Namespace;
};
export const grafanaModule = (args: GrafanaArgs) => {
  const { namespace } = args;
  return new k8s.helm.v3.Chart('system-grafana', {
    namespace: namespace.metadata.name,
    chart: 'grafana',
    version: '6.24.1',
    fetchOpts: {
      repo: 'https://grafana.github.io/helm-charts',
    },
    values: grafanaValues,
  });
};
