import * as k8s from '@pulumi/kubernetes';
import * as keycloak from '@pulumi/keycloak';
import { oAuth2ProxyValues } from './values';
import { Config } from '../../configs';

type OAuth2ProxyModuleArgs = {
  client: keycloak.openid.Client;
};
export const oAuth2ProxyModule = (args: OAuth2ProxyModuleArgs) => {
  const { client } = args;

  const namespace = new k8s.core.v1.Namespace(`${Config.name}-oauth2-proxy-namespace`, {
    metadata: {
      name: `${Config.name}-oauth2-proxy`,
    },
  });

  return new k8s.helm.v3.Chart(
    `${Config.name}-oauth2-proxy`,
    {
      namespace: namespace.metadata.name,
      chart: 'oauth2-proxy',
      version: '5.0.6',
      fetchOpts: {
        repo: 'https://oauth2-proxy.github.io/manifests',
      },
      values: oAuth2ProxyValues,
    },
    {
      dependsOn: [client],
    }
  );
};
