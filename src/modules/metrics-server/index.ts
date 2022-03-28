import * as k8s from '@pulumi/kubernetes';
import { metricsServerValues } from './values';

type MetricsServerModuleArgs = {
  namespace: k8s.core.v1.Namespace;
};
export const metricsServerModule = (args: MetricsServerModuleArgs) => {
  const { namespace } = args;

  // https://raw.githubusercontent.com/alex1989hu/kubelet-serving-cert-approver/main/deploy/standalone-install.yaml
  const kubeletServingCertApprover = new k8s.yaml.ConfigFile(
    'system-kubelet-serving-cert-approver',
    {
      file: 'modules/metrics-server/kubelet-serving-cert-approver.yaml',
    }
  );

  const helm = new k8s.helm.v3.Chart('system-metrics-server', {
    namespace: namespace.metadata.name,
    chart: 'metrics-server',
    version: '3.8.2',
    fetchOpts: {
      repo: 'https://kubernetes-sigs.github.io/metrics-server/',
    },
    values: metricsServerValues,
  });

  return {
    kubeletServingCertApprovert: kubeletServingCertApprover,
    helm,
  };
};
