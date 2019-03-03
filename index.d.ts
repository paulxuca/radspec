declare module 'radspec' {
  import { ethers } from 'ethers';

  type CallOptions = {
    transaction: {
      to?: string;
      data?: string;
    };
    abi: any;
  };

  type Arrayish<T> = T extends Array<T> ? T : T[];

  type UserHelper<T> = (
    provider: ethers.providers.Provider,
    userHelpers: { [name: string]: UserHelper<any> }
  ) => (
    ...args: Arrayish<T>
  ) => {
    type: string;
    value?: string;
    objValue?: { [key: string]: any };
  };

  type BaseEvaluateOptions = {
    provider?: ethers.providers.Provider;
    userHelpers?: { [name: string]: UserHelper<any> };
  };

  type EvaluateOptionsStringReturnType = {
    returnType?: 'string';
  } & BaseEvaluateOptions;

  type EvaluateOptionsObjectReturnType = {
    returnType: 'object';
  } & BaseEvaluateOptions;

  type EvaluateOptions =
    | EvaluateOptionsObjectReturnType
    | EvaluateOptionsStringReturnType;

  export function evaluate(
    source: string,
    call: CallOptions,
    options?: EvaluateOptionsStringReturnType
  ): Promise<string>;

  export function evaluate(
    source: string,
    call: CallOptions,
    options?: EvaluateOptionsObjectReturnType
  ): Promise<TypedValue<any>>;

  export function evaluateRaw(
    source: string,
    bindings: { [bindingName: string]: TypedValue<any> },
    options?: EvaluateOptionsObjectReturnType
  ): Promise<TypedValue<any>[]>;

  export function evaluateRaw(
    source: string,
    bindings: { [bindingName: string]: TypedValue<any> },
    options?: EvaluateOptionsStringReturnType
  ): Promise<string>;

  export class TypedValue<T> {
    type: string;
    value: string;
    objValue?: T;
  }
}
