import * as keycloak from '@pulumi/keycloak';
import { Config } from '../../../configs';

type SetupRealmArgs = {
  provider: keycloak.Provider;
};
export const setupRealm = (args: SetupRealmArgs) => {
  const { provider } = args;
  return new keycloak.Realm(
    `${Config.name}-keycloak-realm`,
    {
      realm: Config.keycloak.name,
      displayName: Config.keycloak.title,
      displayNameHtml: `<b>${Config.keycloak.title}</b>`,
      enabled: true,
      internationalization: {
        defaultLocale: 'en',
        supportedLocales: ['en', 'es'],
      },
      loginTheme: Config.keycloak.theme,
      accountTheme: Config.keycloak.theme,
      adminTheme: Config.keycloak.theme,
      emailTheme: Config.keycloak.theme,
      loginWithEmailAllowed: true,
      rememberMe: true,
      accessCodeLifespan: '8h',
      sslRequired: 'external',
      // TODO: Fix reverse dependencies conflict
      browserFlow: 'auth-flow',
    },
    {
      provider: provider,
      dependsOn: [provider],
    }
  );
};
