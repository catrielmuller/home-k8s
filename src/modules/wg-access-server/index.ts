import * as k8s from '@pulumi/kubernetes';
import { Config } from '../../configs';
import { wgAccessServerValues } from './values';

export const wgAccessServerModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-wg-access-server-namespace`, {
    metadata: {
      name: `${Config.name}-wg-access-server`,
    },
  });

  return new k8s.helm.v3.Chart(`${Config.name}-wg-access-server`, {
    namespace: namespace.metadata.name,
    chart: 'wg-access-server',
    version: '0.9.6',
    fetchOpts: {
      repo: 'https://catrielmuller.github.io/wg-access-server-chart/',
    },
    values: wgAccessServerValues,
  });
};
