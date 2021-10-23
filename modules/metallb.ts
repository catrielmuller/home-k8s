import * as k8s from "@pulumi/kubernetes";
import { Config } from "../configs";

const values: any = {
  configInline: {
    'address-pools': [
      {
        name: 'generic-cluster-pool',
        protocol: Config.metalLB.protocol,
        addresses: Config.metalLB.addresses
      }
    ]
  }
}

export const MetalLBModule = (ns: k8s.core.v1.Namespace) => {
  const chart = new k8s.helm.v3.Chart('system-metallb', {
    namespace: ns.metadata.name,
    chart: 'metallb',
    version: '0.10.2',
    fetchOpts: {
      repo: 'https://metallb.github.io/metallb'
    },
    values: values
  })
  return chart
}
