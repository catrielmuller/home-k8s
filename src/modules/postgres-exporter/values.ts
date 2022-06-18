import { Config } from '../../configs';

export const postgresExporterValues = {
  service: {
    port: 9187,
    annotations: {
      'prometheus.io/scrape': 'true',
      'prometheus.io/path': '/metrics',
      'prometheus.io/scheme': 'http',
    },
  },
  config: {
    datasource: {
      host: Config.postgresql.host,
      user: Config.postgresql.username,
      password: Config.postgresql.password,
      database: Config.postgresql.database,
    },
  },
};
