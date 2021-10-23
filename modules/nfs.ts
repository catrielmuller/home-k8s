import * as k8s from "@pulumi/kubernetes";
import { Config } from "../configs";

const values: any = {
  nfs: {
    server: Config.nfs.server,
    path: Config.nfs.path
  }
}

export const NFSSubDirExternalProvisionerModule = (ns: k8s.core.v1.Namespace) => {
  const chart = new k8s.helm.v3.Chart('system-nfs', {
    namespace: ns.metadata.name,
    chart: 'nfs-subdir-external-provisioner',
    version: '4.0.14',
    fetchOpts: {
      repo: 'https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner/'
    },
    values: values
  })
  return chart
}
