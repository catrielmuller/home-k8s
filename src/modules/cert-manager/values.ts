import { Config } from '../../configs';

export const certManagerValues = {
  installCRDs: true,
  ingressShim: {
    defaultIssuerName: Config.certManager.issuer,
    defaultIssuerKind: 'ClusterIssuer',
  },
};
