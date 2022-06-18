import * as keycloak from '@pulumi/keycloak';
import { Config } from '../../../configs';

type SetupRealmArgs = {
  provider: keycloak.Provider;
  realm: keycloak.Realm;
};
export const setupAuthFlow = (args: SetupRealmArgs) => {
  const { provider, realm } = args;

  const authFlow = new keycloak.authentication.Flow(
    `${Config.name}-keycloak-auth-flow`,
    {
      realmId: realm.id,
      alias: 'auth-flow',
    },
    {
      provider: provider,
      dependsOn: [realm],
    }
  );

  const cookieExecution = new keycloak.authentication.Execution(
    `${Config.name}-keycloak-auth-flow-cookie`,
    {
      realmId: realm.id,
      parentFlowAlias: authFlow.alias,
      authenticator: 'auth-cookie',
      requirement: 'ALTERNATIVE',
    },
    {
      provider: provider,
      dependsOn: [authFlow],
    }
  );

  const identityExecution = new keycloak.authentication.Execution(
    `${Config.name}-keycloak-auth-flow-identity`,
    {
      realmId: realm.id,
      parentFlowAlias: authFlow.alias,
      authenticator: 'identity-provider-redirector',
      requirement: 'ALTERNATIVE',
    },
    {
      provider: provider,
      dependsOn: [cookieExecution],
    }
  );

  const formFlow = new keycloak.authentication.Subflow(
    `${Config.name}-keycloak-auth-flow-form`,
    {
      realmId: realm.id,
      alias: 'auth-form',
      parentFlowAlias: authFlow.alias,
      requirement: 'ALTERNATIVE',
    },
    {
      provider: provider,
      dependsOn: [identityExecution],
    }
  );

  const usernameExecution = new keycloak.authentication.Execution(
    `${Config.name}-keycloak-auth-flow-username`,
    {
      realmId: realm.id,
      parentFlowAlias: formFlow.alias,
      authenticator: 'auth-username-form',
      requirement: 'REQUIRED',
    },
    {
      provider: provider,
      dependsOn: [formFlow],
    }
  );

  const passwordFormFlow = new keycloak.authentication.Subflow(
    `${Config.name}-keycloak-auth-flow-password-form`,
    {
      realmId: realm.id,
      alias: 'auth-password',
      parentFlowAlias: formFlow.alias,
      requirement: 'REQUIRED',
    },
    {
      provider: provider,
      dependsOn: [usernameExecution],
    }
  );

  const passwordlessExecution = new keycloak.authentication.Execution(
    `${Config.name}-keycloak-auth-flow-passwordless`,
    {
      realmId: realm.id,
      parentFlowAlias: passwordFormFlow.alias,
      authenticator: 'webauthn-authenticator-passwordless',
      requirement: 'ALTERNATIVE',
    },
    {
      provider: provider,
      dependsOn: [passwordFormFlow],
    }
  );

  const passwordExecution = new keycloak.authentication.Execution(
    `${Config.name}-keycloak-auth-flow-password`,
    {
      realmId: realm.id,
      parentFlowAlias: passwordFormFlow.alias,
      authenticator: 'auth-password-form',
      requirement: 'ALTERNATIVE',
    },
    {
      provider: provider,
      dependsOn: [passwordlessExecution],
    }
  );

  const otpExecution = new keycloak.authentication.Execution(
    `${Config.name}-keycloak-auth-flow-otp`,
    {
      realmId: realm.id,
      parentFlowAlias: passwordFormFlow.alias,
      authenticator: 'auth-otp-form',
      requirement: 'ALTERNATIVE',
    },
    {
      provider: provider,
      dependsOn: [passwordExecution],
    }
  );

  return {
    authFlow,
    cookieExecution,
    identityExecution,
    formFlow,
    usernameExecution,
    passwordFormFlow,
    passwordlessExecution,
    passwordExecution,
    otpExecution,
  };
};
