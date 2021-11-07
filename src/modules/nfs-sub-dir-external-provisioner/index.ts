import * as k8s from '@pulumi/kubernetes';
import { nfsSubDirExternalProvisionerValues } from './values';

type NfsSubDirExternalProvisionerModuleArgs = {
  namespace: k8s.core.v1.Namespace;
};
export const nfsSubDirExternalProvisionerModule = (
  args: NfsSubDirExternalProvisionerModuleArgs
) => {
  const { namespace } = args;
  return new k8s.helm.v3.Chart('system-nfs', {
    namespace: namespace.metadata.name,
    chart: 'nfs-subdir-external-provisioner',
    version: '4.0.14',
    fetchOpts: {
      repo: 'https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner/',
    },
    values: nfsSubDirExternalProvisionerValues,
  });
};
