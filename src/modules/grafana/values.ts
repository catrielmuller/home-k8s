import { Config } from '../../configs';

export const grafanaValues = {
  ingress: {
    enabled: true,
    annotations: {
      'kubernetes.io/ingress.class': 'nginx',
      'cert-manager.io/cluster-issuer': Config.certManager.issuer,
      'nginx.ingress.kubernetes.io/auth-url': `http://${Config.oauth2Proxy.ip}:80/oauth2/auth`,
      'nginx.ingress.kubernetes.io/auth-signin': `https://${Config.oauth2Proxy.host}/oauth2/start?rd=https://$host$escaped_request_uri`,
    },
    path: '/',
    pathType: 'Prefix',
    hosts: [Config.grafana.host],
    tls: [
      {
        hosts: [Config.grafana.host],
        secretName: `grafana-tls`,
      },
    ],
  },
  persistence: {
    type: 'pvc',
    enabled: true,
    accessModes: ['ReadWriteOnce'],
    storageClassName: 'nfs-client',
    size: '10Gi',
  },
  adminUser: Config.grafana.adminUsername,
  adminPassword: Config.grafana.adminPassword,
};
