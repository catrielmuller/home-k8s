import { Config } from '../../configs';

export const ingressNginxValues = {
  controller: {
    service: {
      loadBalancerIP: Config.ingressNginx.ip,
    },
    metrics: {
      enabled: true,
      service: {
        annotations: {
          'prometheus.io/scrape': 'true',
          'prometheus.io/port': '10254',
        },
      },
    },
  },
};
