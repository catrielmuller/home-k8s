import { Config } from '../../configs';

export const dashboardValues = {
  ingress: {
    enabled: true,
    annotations: {
      'kubernetes.io/ingress.class': 'nginx',
      'cert-manager.io/cluster-issuer': Config.certManager.issuer,
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
