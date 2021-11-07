import { Config } from '../../configs';

export const keycloakValues = {
  image: {
    repository: 'docker.io/sleighzy/keycloak',
    tag: '15.0.2-arm64',
  },
  ingress: {
    enabled: true,
    apiVersion: 'networking.k8s.io/v1',
    annotations: {
      'kubernetes.io/ingress.class': 'nginx',
      'cert-manager.io/cluster-issuer': Config.certManager.issuer,
    },
    rules: [
      {
        host: Config.keycloak.host,
        paths: [
          {
            path: '/',
            pathType: 'Prefix',
          },
        ],
      },
    ],
    tls: [
      {
        hosts: [Config.keycloak.host],
        secretName: 'system-keycloak-tls',
      },
    ],
  },
  postgresql: {
    enabled: false,
  },
  extraEnv: `[
    {
      name: "PROXY_ADDRESS_FORWARDING",
      value: "true"
    },
    {
      name: "DB_VENDOR",
      value: "postgres"
    },
    {
      name: "DB_ADDR",
      value: "${Config.postgresql.ip}"
    },
    {
      name: "DB_PORT",
      value: "5432"
    },
    {
      name: "DB_DATABASE",
      value: "system-keycloak"
    },
    {
      name: "DB_USER",
      value: "${Config.postgresql.username}"
    },
    {
      name: "DB_PASSWORD",
      value: "${Config.postgresql.password}"
    },
    {
      name: "KEYCLOAK_USER",
      value: "${Config.keycloak.username}"
    },
    {
      name: "KEYCLOAK_PASSWORD",
      value: "${Config.keycloak.password}"
    },
  ]`,
};
