import * as k8s from '@pulumi/kubernetes';
import { ingressNginxValues } from './values';

type IngressNginxModuleArgs = {
  namespace: k8s.core.v1.Namespace;
};
export const ingressNginxModule = (args: IngressNginxModuleArgs) => {
  const { namespace } = args;
  return new k8s.helm.v3.Chart('system-ingress-nginx', {
    namespace: namespace.metadata.name,
    chart: 'ingress-nginx',
    version: '4.0.13',
    fetchOpts: {
      repo: 'https://kubernetes.github.io/ingress-nginx',
    },
    values: ingressNginxValues,
  });
};
