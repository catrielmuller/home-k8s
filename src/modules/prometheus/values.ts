import { Config } from '../../configs';

export const prometheusValues = {
  alertmanager: {
    ingress: {
      enabled: true,
      annotations: {
        'kubernetes.io/ingress.class': 'nginx',
        'cert-manager.io/cluster-issuer': Config.certManager.issuer,
        'nginx.ingress.kubernetes.io/auth-url': `http://${Config.oauth2Proxy.ip}:80/oauth2/auth`,
        'nginx.ingress.kubernetes.io/auth-signin': `https://${Config.oauth2Proxy.host}/oauth2/start?rd=https://$host$escaped_request_uri`,
      },
      hosts: [Config.alertmanager.host],
      tls: [
        {
          hosts: [Config.alertmanager.host],
          secretName: `alertmanager-tls`,
        },
      ],
    },
    persistentVolume: {
      enabled: true,
      storageClass: 'nfs-client',
      accessModes: ['ReadWriteOnce'],
      size: '10Gi',
    },
  },
  server: {
    ingress: {
      enabled: true,
      annotations: {
        'kubernetes.io/ingress.class': 'nginx',
        'cert-manager.io/cluster-issuer': Config.certManager.issuer,
        'nginx.ingress.kubernetes.io/auth-url': `http://${Config.oauth2Proxy.ip}:80/oauth2/auth`,
        'nginx.ingress.kubernetes.io/auth-signin': `https://${Config.oauth2Proxy.host}/oauth2/start?rd=https://$host$escaped_request_uri`,
      },
      hosts: [Config.prometheus.host],
      tls: [
        {
          hosts: [Config.prometheus.host],
          secretName: `prometheus-tls`,
        },
      ],
    },
    persistentVolume: {
      enabled: true,
      storageClass: 'nfs-client',
      accessModes: ['ReadWriteOnce'],
      size: '50Gi',
    },
    retention: '30d',
  },
};
