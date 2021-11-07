/* eslint-disable @typescript-eslint/no-explicit-any */
// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from '@pulumi/pulumi';
import { input as inputs, output as outputs } from '../../types';
import * as utilities from '../../utilities';

import { ObjectMeta } from '../../meta/v1';

/**
 * A CertificateRequest is used to request a signed certificate from one of the configured issuers.
 *  All fields within the CertificateRequest's `spec` are immutable after creation. A CertificateRequest will either succeed or fail, as denoted by its `status.state` field.
 *  A CertificateRequest is a one-shot resource, meaning it represents a single point in time request for a certificate and cannot be re-used.
 */
export class CertificateRequest extends pulumi.CustomResource {
  /**
   * Get an existing CertificateRequest resource's state with the given name, ID, and optional extra
   * properties used to qualify the lookup.
   *
   * @param name The _unique_ name of the resulting resource.
   * @param id The _unique_ provider ID of the resource to lookup.
   * @param opts Optional settings to control the behavior of the CustomResource.
   */
  public static get(
    name: string,
    id: pulumi.Input<pulumi.ID>,
    opts?: pulumi.CustomResourceOptions
  ): CertificateRequest {
    return new CertificateRequest(name, undefined as any, { ...opts, id: id });
  }

  /** @internal */
  public static readonly __pulumiType = 'kubernetes:cert-manager.io/v1alpha3:CertificateRequest';

  /**
   * Returns true if the given object is an instance of CertificateRequest.  This is designed to work even
   * when multiple copies of the Pulumi SDK have been loaded into the same process.
   */
  public static isInstance(obj: any): obj is CertificateRequest {
    if (obj === undefined || obj === null) {
      return false;
    }
    return obj['__pulumiType'] === CertificateRequest.__pulumiType;
  }

  public readonly apiVersion!: pulumi.Output<'cert-manager.io/v1alpha3' | undefined>;
  public readonly kind!: pulumi.Output<'CertificateRequest' | undefined>;
  public readonly metadata!: pulumi.Output<ObjectMeta | undefined>;
  /**
   * Desired state of the CertificateRequest resource.
   */
  public readonly spec!: pulumi.Output<
    outputs.certmanager.v1alpha3.CertificateRequestSpec | undefined
  >;
  /**
   * Status of the CertificateRequest. This is set and managed automatically.
   */
  public readonly status!: pulumi.Output<
    outputs.certmanager.v1alpha3.CertificateRequestStatus | undefined
  >;

  /**
   * Create a CertificateRequest resource with the given unique name, arguments, and options.
   *
   * @param name The _unique_ name of the resource.
   * @param args The arguments to use to populate this resource's properties.
   * @param opts A bag of options that control this resource's behavior.
   */
  constructor(name: string, args?: CertificateRequestArgs, opts?: pulumi.CustomResourceOptions) {
    const inputs: pulumi.Inputs = {};
    opts = opts || {};
    if (!opts.id) {
      inputs['apiVersion'] = 'cert-manager.io/v1alpha3';
      inputs['kind'] = 'CertificateRequest';
      inputs['metadata'] = args ? args.metadata : undefined;
      inputs['spec'] = args ? args.spec : undefined;
      inputs['status'] = args ? args.status : undefined;
    } else {
      inputs['apiVersion'] = undefined /*out*/;
      inputs['kind'] = undefined /*out*/;
      inputs['metadata'] = undefined /*out*/;
      inputs['spec'] = undefined /*out*/;
      inputs['status'] = undefined /*out*/;
    }
    if (!opts.version) {
      opts = pulumi.mergeOptions(opts, { version: utilities.getVersion() });
    }
    super(CertificateRequest.__pulumiType, name, inputs, opts);
  }
}

/**
 * The set of arguments for constructing a CertificateRequest resource.
 */
export type CertificateRequestArgs = {
  readonly apiVersion?: pulumi.Input<'cert-manager.io/v1alpha3'>;
  readonly kind?: pulumi.Input<'CertificateRequest'>;
  readonly metadata?: pulumi.Input<ObjectMeta>;
  /**
   * Desired state of the CertificateRequest resource.
   */
  readonly spec?: pulumi.Input<inputs.certmanager.v1alpha3.CertificateRequestSpecArgs>;
  /**
   * Status of the CertificateRequest. This is set and managed automatically.
   */
  readonly status?: pulumi.Input<inputs.certmanager.v1alpha3.CertificateRequestStatusArgs>;
};
