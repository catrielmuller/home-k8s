/* eslint-disable @typescript-eslint/no-explicit-any */
// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from '@pulumi/pulumi';
import { input as inputs, output as outputs } from '../../types';
import * as utilities from '../../utilities';

import { ObjectMeta } from '../../meta/v1';

/**
 * Challenge is a type to represent a Challenge request with an ACME server
 */
export class Challenge extends pulumi.CustomResource {
  /**
   * Get an existing Challenge resource's state with the given name, ID, and optional extra
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
  ): Challenge {
    return new Challenge(name, undefined as any, { ...opts, id: id });
  }

  /** @internal */
  public static readonly __pulumiType = 'kubernetes:acme.cert-manager.io/v1alpha2:Challenge';

  /**
   * Returns true if the given object is an instance of Challenge.  This is designed to work even
   * when multiple copies of the Pulumi SDK have been loaded into the same process.
   */
  public static isInstance(obj: any): obj is Challenge {
    if (obj === undefined || obj === null) {
      return false;
    }
    return obj['__pulumiType'] === Challenge.__pulumiType;
  }

  public readonly apiVersion!: pulumi.Output<'acme.cert-manager.io/v1alpha2' | undefined>;
  public readonly kind!: pulumi.Output<'Challenge' | undefined>;
  public readonly metadata!: pulumi.Output<ObjectMeta>;
  public readonly spec!: pulumi.Output<outputs.acme.v1alpha2.ChallengeSpec | undefined>;
  public readonly status!: pulumi.Output<outputs.acme.v1alpha2.ChallengeStatus | undefined>;

  /**
   * Create a Challenge resource with the given unique name, arguments, and options.
   *
   * @param name The _unique_ name of the resource.
   * @param args The arguments to use to populate this resource's properties.
   * @param opts A bag of options that control this resource's behavior.
   */
  constructor(name: string, args?: ChallengeArgs, opts?: pulumi.CustomResourceOptions) {
    const inputs: pulumi.Inputs = {};
    opts = opts || {};
    if (!opts.id) {
      inputs['apiVersion'] = 'acme.cert-manager.io/v1alpha2';
      inputs['kind'] = 'Challenge';
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
    super(Challenge.__pulumiType, name, inputs, opts);
  }
}

/**
 * The set of arguments for constructing a Challenge resource.
 */
export type ChallengeArgs = {
  readonly apiVersion?: pulumi.Input<'acme.cert-manager.io/v1alpha2'>;
  readonly kind?: pulumi.Input<'Challenge'>;
  readonly metadata?: pulumi.Input<ObjectMeta>;
  readonly spec?: pulumi.Input<inputs.acme.v1alpha2.ChallengeSpecArgs>;
  readonly status?: pulumi.Input<inputs.acme.v1alpha2.ChallengeStatusArgs>;
};
