/* eslint-disable @typescript-eslint/no-unused-vars */

import { metalLBModule } from './modules/metal-lb';
import { nfsSubDirExternalProvisionerModule } from './modules/nfs-sub-dir-external-provisioner';
import { ingressNginxModule } from './modules/ingress-nginx';
import { certManagerModule } from './modules/cert-manager';
import { dashboardModule } from './modules/dashboard';
import { postgresqlModule } from './modules/postgresql';
import { keycloakModule } from './modules/keycloack';
import { oAuth2ProxyModule } from './modules/oauth2-proxy';
import { wgAccessServerModule } from './modules/wg-access-server';
import { prometheusModule } from './modules/prometheus';
import { metricsServerModule } from './modules/metrics-server';
import { grafanaModule } from './modules/grafana';
import { flameModule } from './modules/flame';
import { postgresExporterModule } from './modules/postgres-exporter';
import { espModule } from './modules/esp';
import { assistantModule } from './modules/assistant';

// TODO: Export variables to pulumi
const metalLB = metalLBModule();
const nfsSubDirExternalProvisioner = nfsSubDirExternalProvisionerModule();
const ingressNginx = ingressNginxModule();
const certManager = certManagerModule();
const postgresql = postgresqlModule();
const keycloak = keycloakModule({
  databaseProvider: postgresql.provider,
});
const OAuth2Proxy = oAuth2ProxyModule({
  client: keycloak.keycloak.client,
});
const dashboard = dashboardModule();
const wgAccessServer = wgAccessServerModule();
const metricsServer = metricsServerModule();
const prometheus = prometheusModule();
const postgresExporter = postgresExporterModule();
const grafana = grafanaModule();
const flame = flameModule();
const esp = espModule();
const assistant = assistantModule({
  databaseProvider: postgresql.provider,
});
