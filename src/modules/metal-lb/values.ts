import { Config } from '../../configs';

export const metalLBValues = {
  configInline: {
    'address-pools': [
      {
        name: 'generic-cluster-pool',
        protocol: Config.metalLB.protocol,
        addresses: Config.metalLB.addresses,
      },
    ],
  },
};
