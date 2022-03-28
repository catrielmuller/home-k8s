/* eslint-disable @typescript-eslint/no-unused-vars */

import { namespaceModule } from './modules/namespace';
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

// TODO: Export variables to pulumi
const namespace = namespaceModule();
const metalLB = metalLBModule({ namespace });
const nfsSubDirExternalProvisioner = nfsSubDirExternalProvisionerModule({ namespace });
const ingressNginx = ingressNginxModule({ namespace });
const certManager = certManagerModule({ namespace });
const Postgresql = postgresqlModule({ namespace });
const keycloak = keycloakModule({
  namespace,
  databaseProvider: Postgresql.provider,
});
const OAuth2Proxy = oAuth2ProxyModule({
  namespace,
  client: keycloak.keycloak.client,
});
const dashboard = dashboardModule({ namespace });
const wgAccessServer = wgAccessServerModule({ namespace });
const prometheus = prometheusModule({ namespace });
const metricsServer = metricsServerModule({ namespace });
const grafana = grafanaModule({ namespace });
const flame = flameModule({ namespace });
