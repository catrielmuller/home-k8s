import * as k8s from '@pulumi/kubernetes';
import { flameValues } from './values';

type GlameModuleArgs = {
  namespace: k8s.core.v1.Namespace;
};
export const flameModule = (args: GlameModuleArgs) => {
  const { namespace } = args;

  return new k8s.helm.v3.Chart('system-flame', {
    namespace: namespace.metadata.name,
    chart: 'flame',
    version: '0.3.0',
    fetchOpts: {
      repo: 'https://rlex.github.io/helm-charts/',
    },
    values: flameValues,
  });
};
