import * as k8s from "@pulumi/kubernetes";
import { Config } from "../configs";
import * as certmanager from '../crds/cert-manager';

const values: any = {
  installCRDs: true,
  ingressShim: {
    defaultIssuerName: Config.certManager.issuer,
    defaultIssuerKind: 'ClusterIssuer'
  }
}

export const CertManagerModule = (ns: k8s.core.v1.Namespace) => {
  const chart = new k8s.helm.v3.Chart('system-cert-manager', {
    namespace: ns.metadata.name,
    chart: 'cert-manager',
    version: '1.5.4',
    fetchOpts: {
      repo: 'https://charts.jetstack.io/'
    },
    values: values
  })

  const letencryptStaging = new certmanager.certmanager.v1.ClusterIssuer('system-cert-manager-staging', {
    metadata: {
      name: Config.certManager.staging,
      namespace: ns.metadata.name
    },
    spec: {
      acme: {
        email: Config.certManager.email,
        server: 'https://acme-staging-v02.api.letsencrypt.org/directory',
        privateKeySecretRef: {
          name: Config.certManager.stagingPrivateKey
        },
        solvers: [
          {
            http01: {
              ingress: {
                class: 'nginx'
              }
            }
          }
        ]
      }
    }
  }, {
    dependsOn: [chart]
  })

  const letencryptProd = new certmanager.certmanager.v1.ClusterIssuer('system-cert-manager-prod', {
    metadata: {
      name: Config.certManager.issuer,
      namespace: ns.metadata.name
    },
    spec: {
      acme: {
        email: Config.certManager.email,
        server: 'https://acme-v02.api.letsencrypt.org/directory',
        privateKeySecretRef: {
          name: Config.certManager.issuerPrivateKey
        },
        solvers: [
          {
            http01: {
              ingress: {
                class: 'nginx'
              }
            }
          }
        ]
      }
    }
  }, {
    dependsOn: [chart]
  })

  return {
    chart,
    letencryptStaging,
    letencryptProd
  } 
}
