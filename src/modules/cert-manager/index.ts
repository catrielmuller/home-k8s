import * as k8s from '@pulumi/kubernetes';
import { certManagerValues } from './values';
import { certManagerIssuers } from './issuers';

type CertManagerModuleArgs = {
  namespace: k8s.core.v1.Namespace;
};
export const certManagerModule = (args: CertManagerModuleArgs) => {
  const { namespace } = args;
  const chart = new k8s.helm.v3.Chart('system-cert-manager', {
    namespace: namespace.metadata.name,
    chart: 'cert-manager',
    version: '1.5.4',
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
