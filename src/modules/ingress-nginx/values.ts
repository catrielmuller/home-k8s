import { Config } from '../../configs';

export const ingressNginxValues = {
  controller: {
    service: {
      loadBalancerIP: Config.ingressNginx.ip,
    },
  },
};
