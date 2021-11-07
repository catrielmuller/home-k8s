import * as keycloak from "@pulumi/keycloak";
import { Config } from "../../../configs";

type SetupMappersArgs = {
  provider: keycloak.Provider
  realm: keycloak.Realm
  client: keycloak.openid.Client
}
export const setupMappers = (args: SetupMappersArgs) => {
  const { provider, realm, client } = args;
  const group = new keycloak.openid.GroupMembershipProtocolMapper("system-keycloak-client-group-mapper", {
    realmId: realm.id,
    name: 'group-mapper',
    clientId: client.id,
    claimName: "groups",
  }, {
    provider: provider,
    dependsOn: [realm, client]
  });
  const audience = new keycloak.openid.AudienceProtocolMapper("system-keycloak-client-audience-mapper", {
    realmId: realm.id,
    name: 'audience-mapper',
    clientId: client.id,
    includedClientAudience: client.name,
  }, {
    provider: provider,
    dependsOn: [realm, client]
  });
  return {
    group,
    audience,
  }
}