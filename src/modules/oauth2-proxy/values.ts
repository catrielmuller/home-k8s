import { Config } from '../../configs';

export const oAuth2ProxyValues = {
  image: {
    tag: 'v7.2.1-arm64',
  },
  service: {
    type: 'LoadBalancer',
    loadBalancerIP: Config.oauth2Proxy.ip,
  },
  config: {
    clientID: Config.keycloak.clientId,
    clientSecret: Config.keycloak.clientSecret,
    cookieSecret: Config.oauth2Proxy.cookieSecret,
  },
  extraArgs: {
    provider: 'keycloak-oidc',
    'oidc-issuer-url': `https://${Config.keycloak.host}/auth/realms/${Config.keycloak.name}`,
    'allowed-role': Config.keycloak.roles[0],
    'redirect-url': `https://${Config.oauth2Proxy.host}/oauth2/callback`,
    'cookie-domain': `.${Config.domains.apps},.${Config.domains.root}`,
    'whitelist-domain': `.${Config.domains.apps},.${Config.domains.root}`,
    'set-authorization-header': 'true',
  },
  ingress: {
    enabled: true,
    annotations: {
      'kubernetes.io/ingress.class': 'nginx',
      'nginx.ingress.kubernetes.io/proxy-buffer-size': '64k',
      'cert-manager.io/cluster-issuer': Config.certManager.issuer,
    },
    hosts: [Config.oauth2Proxy.host],
    tls: [
      {
        secretName: `${Config.name}-oauth2-proxy-tls`,
        hosts: [Config.oauth2Proxy.host],
      },
    ],
  },
};
