import * as pulumi from '@pulumi/pulumi';
const PulumiConfig = new pulumi.Config();

const name = 'home';
const kubernetes = {
  token: PulumiConfig.require('kubernetes-token'),
};
const registry = {
  dockerhub: {
    token: PulumiConfig.require('dockerhub-token'),
  },
};
const domains = {
  root: 'home.kei.ar',
  apps: 'apps.home.kei.ar',
};
const metalLB = {
  protocol: 'layer2',
  addresses: ['10.0.11.1-10.0.11.254'],
};
const nfs = {
  server: '10.0.4.1',
  path: '/Kubernetes',
};
const ingressNginx = {
  ip: '10.0.11.1',
};
const certManager = {
  issuer: 'letsencrypt-prod',
  issuerPrivateKey: 'letsencrypt-private-key-prod',
  staging: 'letsencrypt-staging',
  stagingPrivateKey: 'letsencrypt-private-key-staging',
  email: 'catrielmuller@gmail.com',
};
const dashboard = {
  host: 'dashboard.home.kei.ar',
};
const postgresql = {
  username: 'postgres',
  database: 'postgres',
  password: PulumiConfig.require('postgresql-password'),
  ip: '10.0.11.2',
  host: 'home-postgresql.home-postgresql',
};
const oauth2Proxy = {
  ip: '10.0.11.3',
  host: 'auth.home.kei.ar',
  internalHost: 'system-oauth2-proxy.home-system',
  cookieSecret: PulumiConfig.require('oauth2-proxy-cookie-secret'),
};
const keycloak = {
  host: 'keys.home.kei.ar',
  username: 'admin',
  password: PulumiConfig.require('keycloak-admin-password'),
  theme: 'keycloak',
  name: 'home',
  title: 'Home',
  clientId: 'home',
  clientSecret: PulumiConfig.require('keycloak-client-secret'),
  roles: ['admin', 'home'],
};
const wgAccessServer = {
  adminUsername: 'admin',
  adminPassword: PulumiConfig.require('wg-access-server-password'),
  adminIp: '10.0.11.4',
  privateKey: PulumiConfig.require('wg-access-server-private-key'),
  wireguardIP: '10.0.11.5',
  host: 'vpn.home.kei.ar',
};
const prometheus = {
  host: 'prometheus.home.kei.ar',
};
const alertmanager = {
  host: 'alertmanager.home.kei.ar',
};
const grafana = {
  host: 'grafana.home.kei.ar',
  adminUsername: 'admin',
  adminPassword: PulumiConfig.require('grafana-password'),
};
const flame = {
  host: 'home.kei.ar',
  adminPassword: PulumiConfig.require('flame-password'),
};
const esp = {
  ip: '10.0.11.6',
  host: 'esp.home.kei.ar',
};
const assistant = {
  ip: '10.0.11.7',
  host: 'assistant.home.kei.ar',
};
const cal = {
  host: `cal.home.kei.ar`,
  email: 'cal@kei.ar',
  nextAuthSecret: PulumiConfig.require('cal-next-auth-secret'),
  encryptionKey: PulumiConfig.require('cal-encryption-key'),
  googleApiCredentials: PulumiConfig.require('cal-google-api-credentials'),
  sendgridApiKey: PulumiConfig.require('cal-sendgrid-api-key'),
};

export const Config = {
  name,
  kubernetes,
  registry,
  domains,
  metalLB,
  nfs,
  ingressNginx,
  certManager,
  dashboard,
  postgresql,
  oauth2Proxy,
  keycloak,
  wgAccessServer,
  prometheus,
  alertmanager,
  grafana,
  flame,
  esp,
  assistant,
  cal,
};
