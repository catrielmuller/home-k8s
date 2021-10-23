export const Config = {
  namespace: 'home-system',
  metalLB: {
    protocol: 'layer2',
    addresses: ['10.0.11.1-10.0.11.254']
  },
  nfs: {
    server: '10.0.4.1',
    path: '/Kubernetes'
  },
  certManager: {
    issuer: 'letsencrypt-prod',
    issuerPrivateKey: 'letsencrypt-private-key-prod',
    staging: 'letsencrypt-staging',
    stagingPrivateKey: 'letsencrypt-private-key-staging',
    email: 'catrielmuller@gmail.com'
  }
}