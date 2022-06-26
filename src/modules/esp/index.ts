import * as k8s from '@pulumi/kubernetes';
import { espValues } from './values';
import { Config } from '../../configs';

export const espModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-esp-namespace`, {
    metadata: {
      name: `${Config.name}-esp`,
    },
  });

  const chart = new k8s.helm.v3.Chart(`${Config.name}-esp`, {
    namespace: namespace.metadata.name,
    chart: 'esphome',
    version: '8.3.2',
    fetchOpts: {
      repo: 'https://k8s-at-home.com/charts/',
    },
    values: espValues,
  });

  return {
    chart,
  };
};
