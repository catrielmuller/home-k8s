import * as k8s from '@pulumi/kubernetes';
import * as keycloak from '@pulumi/keycloak';
import { oAuth2ProxyValues } from './values';

type OAuth2ProxyModuleArgs = {
  namespace: k8s.core.v1.Namespace;
  client: keycloak.openid.Client;
};
export const oAuth2ProxyModule = (args: OAuth2ProxyModuleArgs) => {
  const { namespace, client } = args;
  return new k8s.helm.v3.Chart(
    'system-oauth2-proxy',
    {
      namespace: namespace.metadata.name,
      chart: 'oauth2-proxy',
      version: '5.0.2',
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
