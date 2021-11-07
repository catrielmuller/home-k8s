import { Config } from '../../configs';

export const oAuth2ProxyValues = {
  image: {
    tag: 'v7.2.0-arm64',
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
  },
  ingress: {
    enabled: true,
    annotations: {
      'kubernetes.io/ingress.class': 'nginx',
      'nginx.ingress.kubernetes.io/proxy-buffer-size': '8k',
      'cert-manager.io/cluster-issuer': Config.certManager.issuer,
    },
    hosts: [Config.oauth2Proxy.host],
    tls: [
      {
        secretName: 'system-oauth2-proxy-tls',
        hosts: [Config.oauth2Proxy.host],
      },
    ],
  },
};
