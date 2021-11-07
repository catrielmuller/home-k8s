import * as k8s from '@pulumi/kubernetes';
import { metalLBValues } from './values';

type MetalLBModuleArgs = {
  namespace: k8s.core.v1.Namespace;
};
export const metalLBModule = (args: MetalLBModuleArgs) => {
  const { namespace } = args;
  return new k8s.helm.v3.Chart('system-metallb', {
    namespace: namespace.metadata.name,
    chart: 'metallb',
    version: '0.10.2',
    fetchOpts: {
      repo: 'https://metallb.github.io/metallb',
    },
    values: metalLBValues,
  });
};
