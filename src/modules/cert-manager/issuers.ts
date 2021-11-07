import * as k8s from '@pulumi/kubernetes';
import * as certmanager from '../../crds/cert-manager';
import { Config } from '../../configs';

type CertManagerIssuersArgs = {
  namespace: k8s.core.v1.Namespace;
  chart: k8s.helm.v3.Chart;
};
export const certManagerIssuers = (args: CertManagerIssuersArgs) => {
  const { namespace, chart } = args;

  const staging = new certmanager.certmanager.v1.ClusterIssuer(
    'system-cert-manager-staging',
    {
      metadata: {
        name: Config.certManager.staging,
        namespace: namespace.metadata.name,
      },
      spec: {
        acme: {
          email: Config.certManager.email,
          server: 'https://acme-staging-v02.api.letsencrypt.org/directory',
          privateKeySecretRef: {
            name: Config.certManager.stagingPrivateKey,
          },
          solvers: [
            {
              http01: {
                ingress: {
                  class: 'nginx',
                },
              },
            },
          ],
        },
      },
    },
    {
      dependsOn: [chart],
    }
  );

  const prod = new certmanager.certmanager.v1.ClusterIssuer(
    'system-cert-manager-prod',
    {
      metadata: {
        name: Config.certManager.issuer,
        namespace: namespace.metadata.name,
      },
      spec: {
        acme: {
          email: Config.certManager.email,
          server: 'https://acme-v02.api.letsencrypt.org/directory',
          privateKeySecretRef: {
            name: Config.certManager.issuerPrivateKey,
          },
          solvers: [
            {
              http01: {
                ingress: {
                  class: 'nginx',
                },
              },
            },
          ],
        },
      },
    },
    {
      dependsOn: [chart],
    }
  );

  return {
    prod,
    staging,
  };
};
