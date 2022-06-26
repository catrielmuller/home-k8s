import { Config } from '../../configs';

export const assistantValues = {
  ingress: {
    main: {
      enabled: true,
      annotations: {
        'kubernetes.io/ingress.class': 'nginx',
        'nginx.org/websocket-services': 'home-assistant',
        'cert-manager.io/cluster-issuer': Config.certManager.issuer,
      },
      hosts: [
        {
          host: Config.assistant.host,
          paths: [
            {
              path: '/',
              pathType: 'Prefix',
            },
          ],
        },
      ],
      tls: [
        {
          hosts: [Config.assistant.host],
          secretName: `assistant-tls`,
        },
      ],
    },
  },
  persistence: {
    config: {
      enabled: true,
      storageClass: 'nfs-client',
      size: '40Gi',
      accessModes: ['ReadWriteOnce'],
    },
  },
};
