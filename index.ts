import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";
import { Config } from './configs'
import { MetalLBModule } from "./modules/metallb";

const systemNamespace = new k8s.core.v1.Namespace('system-namespace', {
    metadata: {
        name: Config.namespace
    }
})

const MetalLB = MetalLBModule(systemNamespace)
