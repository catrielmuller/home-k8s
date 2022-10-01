import * as k8s from '@pulumi/kubernetes';
import { Config } from '../../configs';
import { metalLBValues } from './values';

export const metalLBModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-metallb-namespace`, {
    metadata: {
      name: `${Config.name}-metallb`,
    },
  });

  return new k8s.helm.v3.Chart(`${Config.name}-metallb`, {
    namespace: namespace.metadata.name,
    chart: 'metallb',
    version: '0.11.0',
    fetchOpts: {
      repo: 'https://metallb.github.io/metallb',
    },
    values: metalLBValues,
  });
};
