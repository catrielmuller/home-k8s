import * as keycloak from '@pulumi/keycloak';
import { Config } from '../../../configs';

type SetupClientArgs = {
  provider: keycloak.Provider;
  realm: keycloak.Realm;
};
export const setupClient = (args: SetupClientArgs) => {
  const { provider, realm } = args;
  return new keycloak.openid.Client(
    `${Config.name}-keycloak-client`,
    {
      realmId: realm.id,
      name: Config.keycloak.name,
      clientId: Config.keycloak.clientId,
      clientSecret: Config.keycloak.clientSecret,
      accessType: 'CONFIDENTIAL',
      enabled: true,
      standardFlowEnabled: true,
      directAccessGrantsEnabled: true,
      validRedirectUris: [`https://${Config.oauth2Proxy.host}/oauth2/callback`],
      loginTheme: Config.keycloak.theme,
    },
    {
      provider: provider,
      dependsOn: [realm],
    }
  );
};
