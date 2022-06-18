import * as k8s from '@pulumi/kubernetes';
import { Config } from '../../configs';
import { ingressNginxValues } from './values';

export const ingressNginxModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-ingress-nginx-namespace`, {
    metadata: {
      name: `${Config.name}-ingress-nginx`,
    },
  });

  return new k8s.helm.v3.Chart(`${Config.name}-ingress-nginx`, {
    namespace: namespace.metadata.name,
    chart: 'ingress-nginx',
    version: '4.0.13',
    fetchOpts: {
      repo: 'https://kubernetes.github.io/ingress-nginx',
    },
    values: ingressNginxValues,
  });
};
