import { Config } from '../../configs';

export const postgresqlValues = {
  postgresql: {
    username: Config.postgresql.username,
    password: Config.postgresql.password,
    database: Config.postgresql.database,
  },
  service: {
    type: 'LoadBalancer',
    loadBalancerIP: Config.postgresql.ip,
  },
  persistence: {
    enabled: true,
    storageClass: 'nfs-client',
    size: '50Gi',
    accessModes: ['ReadWriteOnce'],
  },
};
