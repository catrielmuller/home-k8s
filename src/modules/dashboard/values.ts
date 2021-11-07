import { Config } from '../../configs';

export const dashboardValues = {
  extraArgs: [],
  ingress: {
    enabled: true,
    annotations: {
      'kubernetes.io/ingress.class': 'nginx',
      'nginx.ingress.kubernetes.io/auth-url': `https://${Config.oauth2Proxy.host}/oauth2/auth`,
      'nginx.ingress.kubernetes.io/auth-signin': `https://${Config.oauth2Proxy.host}/oauth2/start?rd=https://$host$escaped_request_uri`,
      'cert-manager.io/cluster-issuer': Config.certManager.issuer,
      'nginx.ingress.kubernetes.io/configuration-snippet': `
        proxy_set_header Authorization "Bearer ${Config.kubernetes.token}";
      `,
    },
    hosts: [Config.dashboard.host],
    tls: [
      {
        secretName: 'system-dashboard-tls',
        hosts: [Config.dashboard.host],
      },
    ],
  },
};
