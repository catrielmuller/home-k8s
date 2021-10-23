import * as k8s from "@pulumi/kubernetes";
import { Config } from './configs'
import { MetalLBModule } from "./modules/metallb";
import { NFSSubDirExternalProvisionerModule } from './modules/nfs'

const systemNamespace = new k8s.core.v1.Namespace('system-namespace', {
    metadata: {
        name: Config.namespace
    }
})

const MetalLB = MetalLBModule(systemNamespace)
const NFS = NFSSubDirExternalProvisionerModule(systemNamespace)
