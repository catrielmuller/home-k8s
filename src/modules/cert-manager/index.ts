import * as k8s from '@pulumi/kubernetes';
import { certManagerValues } from './values';
import { certManagerIssuers } from './issuers';
import { Config } from '../../configs';

export const certManagerModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-cert-manager-namespace`, {
    metadata: {
      name: `${Config.name}-cert-manager`,
    },
  });
  const chart = new k8s.helm.v3.Chart(`${Config.name}-cert-manager`, {
    namespace: namespace.metadata.name,
    chart: 'cert-manager',
    version: '1.8.0',
    fetchOpts: {
      repo: 'https://charts.jetstack.io/',
    },
    values: certManagerValues,
  });
  const issuers = certManagerIssuers({ namespace, chart });
  return {
    chart,
    issuers,
  };
};
