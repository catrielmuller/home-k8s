import * as k8s from '@pulumi/kubernetes';
import * as keycloak from '@pulumi/keycloak';
import { Config } from '../../../configs';

type SetupProviderArgs = {
  chart: k8s.helm.v3.Chart;
};
export const setupProvider = (args: SetupProviderArgs) => {
  const { chart } = args;

  return new keycloak.Provider(
    `${Config.name}-keycloak-provider`,
    {
      clientId: 'admin-cli',
      clientSecret: Config.keycloak.clientSecret,
      url: `https://${Config.keycloak.host}`,
      username: Config.keycloak.username,
      password: Config.keycloak.password,
      initialLogin: true,
    },
    {
      dependsOn: [chart],
    }
  );
};
