import * as k8s from "@pulumi/kubernetes";
import { Config } from './configs'
import { MetalLBModule } from "./modules/metallb";
import { NFSSubDirExternalProvisionerModule } from './modules/nfs'
import { IngressNginxModule } from './modules/ingress-nginx'
import { CertManagerModule } from './modules/cert-manager'

const systemNamespace = new k8s.core.v1.Namespace('system-namespace', {
    metadata: {
        name: Config.namespace
    }
})

const MetalLB = MetalLBModule(systemNamespace)
const NFS = NFSSubDirExternalProvisionerModule(systemNamespace)
const IngressNginx = IngressNginxModule(systemNamespace)
const CertManager = CertManagerModule(systemNamespace)
