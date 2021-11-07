import * as k8s from '@pulumi/kubernetes';
import { Config } from '../../configs';

export const namespaceModule = () => {
  return new k8s.core.v1.Namespace('system-namespace', {
    metadata: {
      name: Config.namespace,
    },
  });
};
