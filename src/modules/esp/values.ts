import { Config } from '../../configs';

export const espValues = {
  ingress: {
    main: {
      enabled: true,
      annotations: {
        'kubernetes.io/ingress.class': 'nginx',
        'cert-manager.io/cluster-issuer': Config.certManager.issuer,
        'nginx.ingress.kubernetes.io/auth-url': `http://${Config.oauth2Proxy.ip}:80/oauth2/auth`,
        'nginx.ingress.kubernetes.io/auth-signin': `https://${Config.oauth2Proxy.host}/oauth2/start?rd=https://$host$escaped_request_uri`,
      },
      hosts: [
        {
          host: Config.esp.host,
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
          hosts: [Config.esp.host],
          secretName: `esp-tls`,
        },
      ],
    },
  },
  persistence: {
    config: {
      enabled: true,
      storageClass: 'nfs-client',
      size: '10Gi',
      accessModes: ['ReadWriteOnce'],
    },
  },
};
