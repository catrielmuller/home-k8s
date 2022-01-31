import * as k8s from '@pulumi/kubernetes';
import { wgAccessServerValues } from './values';

type WgAccessServerModuleArgs = {
  namespace: k8s.core.v1.Namespace;
};
export const wgAccessServerModule = (args: WgAccessServerModuleArgs) => {
  const { namespace } = args;
  return new k8s.helm.v3.Chart('system-wg-access-server', {
    namespace: namespace.metadata.name,
    chart: 'wg-access-server',
    version: '0.5.1',
    fetchOpts: {
      repo: 'https://freie-netze.org/wg-access-server',
    },
    values: wgAccessServerValues,
  });
};
