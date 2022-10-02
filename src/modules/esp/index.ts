import * as k8s from '@pulumi/kubernetes';
import { Config } from '../../configs';

export const espModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-esp-namespace`, {
    metadata: {
      name: `${Config.name}-esp`,
    },
  });

  const service = new k8s.core.v1.Service(`${Config.name}-esp-service`, {
    metadata: {
      name: `${Config.name}-esp-service`,
      namespace: namespace.metadata.name,
    },
    spec: {
      ports: [
        {
          port: 80,
          targetPort: 6052,
        },
      ],
      selector: {
        app: `${Config.name}-esp`,
      },
    },
  });

  const configVolume = new k8s.core.v1.PersistentVolumeClaim(`${Config.name}-esp-config-volume`, {
    metadata: {
      name: `${Config.name}-esp-config-volume-claim`,
      namespace: namespace.metadata.name,
    },
    spec: {
      storageClassName: 'nfs-client',
      accessModes: ['ReadWriteOnce'],
      resources: {
        requests: {
          storage: '10Gi',
        },
      },
    },
  });

  const deployment = new k8s.apps.v1.Deployment(`${Config.name}-esp-deployment`, {
    metadata: {
      name: `${Config.name}-esp-deployment`,
      namespace: namespace.metadata.name,
    },
    spec: {
      selector: {
        matchLabels: {
          app: `${Config.name}-esp`,
        },
      },
      replicas: 1,
      template: {
        metadata: {
          labels: {
            app: `${Config.name}-esp`,
          },
        },
        spec: {
          volumes: [
            {
              name: 'config',
              persistentVolumeClaim: {
                claimName: configVolume.metadata.name,
              },
            },
          ],
          containers: [
            {
              name: `${Config.name}-esp`,
              image: 'esphome/esphome:2022.9.2',
              ports: [
                {
                  containerPort: 6052,
                },
              ],
              volumeMounts: [
                {
                  name: 'config',
                  mountPath: '/config',
                },
              ],
              env: [
                {
                  name: 'ESPHOME_DASHBOARD_USE_PING',
                  value: 'true',
                },
              ],
            },
          ],
        },
      },
    },
  });

  const ingress = new k8s.networking.v1.Ingress(`${Config.name}-esp-ingress`, {
    metadata: {
      name: `${Config.name}-esp-ingress`,
      namespace: namespace.metadata.name,
      annotations: {
        'kubernetes.io/ingress.class': 'nginx',
        'cert-manager.io/cluster-issuer': Config.certManager.issuer,
        'nginx.ingress.kubernetes.io/auth-url': `http://${Config.oauth2Proxy.ip}:80/oauth2/auth`,
        'nginx.ingress.kubernetes.io/auth-signin': `https://${Config.oauth2Proxy.host}/oauth2/start?rd=https://$host$escaped_request_uri`,
      },
    },
    spec: {
      tls: [
        {
          hosts: [Config.esp.host],
          secretName: `${Config.name}-esp-tls`,
        },
      ],
      rules: [
        {
          host: Config.esp.host,
          http: {
            paths: [
              {
                path: '/',
                pathType: 'Prefix',
                backend: {
                  service: {
                    name: `${Config.name}-esp-service`,
                    port: {
                      number: 80,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  });

  return {
    namespace,
    service,
    configVolume,
    deployment,
    ingress,
  };
};
