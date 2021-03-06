import * as pulumi from '@pulumi/pulumi';
const PulumiConfig = new pulumi.Config();

const name = 'home';
const namespace = 'home-system';
const kubernetes = {
  token: PulumiConfig.require('kubernetes-token'),
};
const domains = {
  root: 'home.kei.ninja',
  apps: 'apps.home.kei.ninja',
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
  host: 'dashboard.home.kei.ninja',
};
const postgresql = {
  username: 'postgres',
  database: 'postgres',
  password: PulumiConfig.require('postgresql-password'),
  ip: '10.0.11.2',
};
const oauth2Proxy = {
  ip: '10.0.11.3',
  host: 'auth.home.kei.ninja',
  internalHost: 'system-oauth2-proxy.home-system',
  cookieSecret: PulumiConfig.require('oauth2-proxy-cookie-secret'),
};
const keycloak = {
  host: 'keys.home.kei.ninja',
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
  host: 'vpn.home.kei.ninja',
};

export const Config = {
  name,
  namespace,
  kubernetes,
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
};
