import * as k8s from '@pulumi/kubernetes';
import * as postgresql from '@pulumi/postgresql';
import { Config } from '../../configs';

type postgresqlProviderArgs = {
  chart: k8s.helm.v3.Chart;
};
export const postgresqlProvider = (args: postgresqlProviderArgs) => {
  const { chart } = args;
  return new postgresql.Provider(
    `${Config.name}-postgresql-provider`,
    {
      host: Config.postgresql.ip,
      database: Config.postgresql.database,
      databaseUsername: Config.postgresql.username,
      username: Config.postgresql.username,
      password: Config.postgresql.password,
      maxConnections: 0,
      sslmode: 'disable',
    },
    {
      dependsOn: [chart],
    }
  );
};
