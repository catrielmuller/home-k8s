import * as k8s from '@pulumi/kubernetes';
import { Config } from '../../configs';
import { flameValues } from './values';

export const flameModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-flame-namespace`, {
    metadata: {
      name: `${Config.name}-flame`,
    },
  });

  return new k8s.helm.v3.Chart(`${Config.name}-flame`, {
    namespace: namespace.metadata.name,
    chart: 'flame',
    version: '0.3.0',
    fetchOpts: {
      repo: 'https://rlex.github.io/helm-charts/',
    },
    values: flameValues,
  });
};
