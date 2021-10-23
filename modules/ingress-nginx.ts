import * as k8s from "@pulumi/kubernetes";

const values: any = {}

export const IngressNginxModule = (ns: k8s.core.v1.Namespace) => {
  const chart = new k8s.helm.v3.Chart('system-ingress-nginx', {
    namespace: ns.metadata.name,
    chart: 'ingress-nginx',
    version: '4.0.5',
    fetchOpts: {
      repo: 'https://kubernetes.github.io/ingress-nginx'
    },
    values: values
  })
  return chart
}
