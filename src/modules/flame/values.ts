import { Config } from '../../configs';

export const flameValues = {
  image: {
    repository: 'pawelmalak/flame',
    tag: 'multiarch2.3.0',
  },
  flame: {
    password: Config.flame.adminPassword,
  },
  ingress: {
    enabled: true,
    annotations: {
      'kubernetes.io/ingress.class': 'nginx',
      'cert-manager.io/cluster-issuer': Config.certManager.issuer,
      'nginx.ingress.kubernetes.io/auth-url': `http://${Config.oauth2Proxy.ip}:80/oauth2/auth`,
      'nginx.ingress.kubernetes.io/auth-signin': `https://${Config.oauth2Proxy.host}/oauth2/start?rd=https://$host$escaped_request_uri`,
    },
    hosts: [
      {
        host: Config.flame.host,
        paths: [
          {
            path: '/',
            pathType: 'ImplementationSpecific',
          },
        ],
      },
    ],
    tls: [
      {
        hosts: [Config.flame.host],
        secretName: `flame-tls`,
      },
    ],
  },
  persistence: {
    enabled: true,
    storageClassName: 'nfs-client',
    accessModes: ['ReadWriteOnce'],
    size: '1Gi',
  },
};
