import { Config } from '../../configs';

const base64Auth = Buffer.from(
  `${Config.wgAccessServer.adminUsername}:${Config.wgAccessServer.adminPassword}`
).toString('base64');

export const wgAccessServerValues = {
  web: {
    config: {
      adminUsername: Config.wgAccessServer.adminUsername,
      adminPassword: Config.wgAccessServer.adminPassword,
    },
    service: {
      type: 'LoadBalancer',
      loadBalancerIP: Config.wgAccessServer.adminIp,
    },
  },
  wireguard: {
    config: {
      privateKey: Config.wgAccessServer.privateKey,
    },
    service: {
      type: 'LoadBalancer',
      loadBalancerIP: Config.wgAccessServer.wireguardIP,
    },
  },
  persistence: {
    enabled: true,
    storageClass: 'nfs-client',
    size: '100Mi',
    accessModes: ['ReadWriteOnce'],
  },
  ingress: {
    enabled: true,
    annotations: {
      'kubernetes.io/ingress.class': 'nginx',
      'cert-manager.io/cluster-issuer': Config.certManager.issuer,
      'nginx.ingress.kubernetes.io/auth-url': `http://${Config.oauth2Proxy.ip}:80/oauth2/auth`,
      'nginx.ingress.kubernetes.io/auth-signin': `https://${Config.oauth2Proxy.host}/oauth2/start?rd=https://$host$escaped_request_uri`,
      'nginx.ingress.kubernetes.io/configuration-snippet': `
        proxy_set_header Authorization "Basic ${base64Auth}";
      `,
    },
    hosts: [Config.wgAccessServer.host],
    tls: [
      {
        hosts: [Config.wgAccessServer.host],
        secretName: `wg-access-server-tls`,
      },
    ],
  },
};
