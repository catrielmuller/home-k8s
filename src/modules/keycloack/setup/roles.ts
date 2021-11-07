import * as keycloak from "@pulumi/keycloak";
import { Config } from "../../../configs";

type SetupRolesArgs = {
  provider: keycloak.Provider
  realm: keycloak.Realm
}
export const setupRoles = (args: SetupRolesArgs) => {
  const { provider, realm } = args;
  return Config.keycloak.roles.map(role => {
    return new keycloak.Role(`system-keycloak-role-${role}`, {
      realmId: realm.id,
      name: role,
      description: `${role} role for ${Config.keycloak.title}`
    }, {
      provider: provider,
      dependsOn: [realm]
    })
  })
}
