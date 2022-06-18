import * as k8s from '@pulumi/kubernetes';
import { Config } from '../../configs';
import { nfsSubDirExternalProvisionerValues } from './values';

export const nfsSubDirExternalProvisionerModule = () => {
  const namespace = new k8s.core.v1.Namespace(`${Config.name}-nfs-namespace`, {
    metadata: {
      name: `${Config.name}-nfs`,
    },
  });

  return new k8s.helm.v3.Chart(`${Config.name}-nfs`, {
    namespace: namespace.metadata.name,
    chart: 'nfs-subdir-external-provisioner',
    version: '4.0.16',
    fetchOpts: {
      repo: 'https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner/',
    },
    values: nfsSubDirExternalProvisionerValues,
  });
};
