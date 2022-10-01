import * as k8s from '@pulumi/kubernetes';
import * as postgresql from '@pulumi/postgresql';
import { Config } from '../../configs';

type CalModuleArgs = {
  databaseProvider: postgresql.Provider;
};
export const calModule = (args: CalModuleArgs) => {
  const { databaseProvider } = args;

  const namespace = new k8s.core.v1.Namespace(`${Config.name}-cal-namespace`, {
    metadata: {
      name: `${Config.name}-cal`,
    },
  });

  const registry = new k8s.core.v1.Secret(`${Config.name}-cal-registry`, {
    metadata: {
      name: `${Config.name}-cal-registry`,
      namespace: namespace.metadata.name,
    },
    type: 'kubernetes.io/dockerconfigjson',
    stringData: {
      '.dockerconfigjson': JSON.stringify({
        auths: {
          'https://index.docker.io/v1/': {
            auth: Config.registry.dockerhub.token,
          },
        },
      }),
    },
  });

  const database = new postgresql.Database(
    `${Config.name}-cal-db`,
    {
      allowConnections: true,
      name: `${Config.name}-cal`,
      owner: Config.postgresql.username,
    },
    {
      provider: databaseProvider,
    }
  );

  const service = new k8s.core.v1.Service(`${Config.name}-cal-service`, {
    metadata: {
      name: `${Config.name}-cal-service`,
      namespace: namespace.metadata.name,
    },
    spec: {
      ports: [
        {
          port: 80,
          targetPort: 3000,
        },
      ],
      selector: {
        app: `${Config.name}-cal`,
      },
    },
  });

  const deployment = new k8s.apps.v1.Deployment(`${Config.name}-cal-deployment`, {
    metadata: {
      name: `${Config.name}-cal-deployment`,
      namespace: namespace.metadata.name,
    },
    spec: {
      selector: {
        matchLabels: {
          app: `${Config.name}-cal`,
        },
      },
      replicas: 1,
      template: {
        metadata: {
          labels: {
            app: `${Config.name}-cal`,
          },
        },
        spec: {
          imagePullSecrets: [
            {
              name: `${Config.name}-cal-registry`,
            },
          ],
          containers: [
            {
              name: `${Config.name}-cal`,
              image: 'catrielmuller/calcom-docker:1276ed54be2508dc55143a8facc2ab04b5106f96',
              ports: [
                {
                  containerPort: 3000,
                },
              ],
              env: [
                {
                  name: 'NEXT_PUBLIC_WEBAPP_URL',
                  value: `https://${Config.cal.host}`,
                },
                {
                  name: 'NEXT_PUBLIC_LICENSE_CONSENT',
                  value: 'agree',
                },
                {
                  name: 'CALCOM_TELEMETRY_DISABLED',
                  value: '1',
                },
                {
                  name: 'NEXTAUTH_SECRET',
                  value: Config.cal.nextAuthSecret,
                },
                {
                  name: 'CALENDSO_ENCRYPTION_KEY',
                  value: Config.cal.encryptionKey,
                },
                {
                  name: 'GOOGLE_API_CREDENTIALS',
                  value: Config.cal.googleApiCredentials,
                },
                {
                  name: 'SENDGRID_API_KEY',
                  value: Config.cal.sendgridApiKey,
                },
                {
                  name: 'SENDGRID_EMAIL',
                  value: Config.cal.email,
                },
                {
                  name: 'EMAIL_FROM',
                  value: Config.cal.email,
                },
                {
                  name: 'DATABASE_URL',
                  value: `postgresql://${Config.postgresql.username}:${Config.postgresql.password}@${Config.postgresql.ip}/${Config.name}-cal`,
                },
              ],
            },
          ],
        },
      },
    },
  });

  const ingress = new k8s.networking.v1.Ingress(`${Config.name}-cal-ingress`, {
    metadata: {
      name: `${Config.name}-cal-ingress`,
      namespace: namespace.metadata.name,
      annotations: {
        'kubernetes.io/ingress.class': 'nginx',
        'cert-manager.io/cluster-issuer': Config.certManager.issuer,
      },
    },
    spec: {
      tls: [
        {
          hosts: [Config.cal.host],
          secretName: `${Config.name}-cal-tls`,
        },
      ],
      rules: [
        {
          host: Config.cal.host,
          http: {
            paths: [
              {
                path: '/',
                pathType: 'Prefix',
                backend: {
                  service: {
                    name: `${Config.name}-cal-service`,
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
    database,
    service,
    deployment,
    ingress,
  };
};
