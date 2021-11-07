import * as k8s from "@pulumi/kubernetes";
import { setupProvider } from "./provider";
import { setupRealm } from "./realm";
import { setupRoles } from "./roles";
import { setupClient } from "./client";
import { setupMappers } from "./mappers";

type KeycloakSetupArgs = {
  chart: k8s.helm.v3.Chart
}
export const keycloakSetup = (args: KeycloakSetupArgs) => {
  const { chart } = args
  const provider = setupProvider({chart})
  const realm = setupRealm({provider})
  const roles = setupRoles({ provider, realm })
  const client = setupClient({ provider, realm })
  const mappers = setupMappers({ provider, realm, client })
  
  return {
    provider,
    realm,
    roles,
    client,
    mappers,
  }
} 