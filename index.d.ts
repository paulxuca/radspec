declare module 'radspec' {
  import { ethers } from 'ethers';

  type CallOptions = {
    transaction: {
      to?: string;
      data?: string;
    };
    abi: any;
  };

  type UserHelper = <T>(
    provider: ethers.providers.Provider,
    userHelpers: { [name: string]: UserHelper }
  ) => (
    ...args: T
  ) => {
    type: string;
    value?: string;
    objValue?: { [key: string]: any };
  };

  type EvaluateOptions = {
    provider?: ethers.providers.Provider;
    userHelpers?: { [name: string]: UserHelper };
    returnType?: 'string' | 'object';
  };

  export function evaluate(
    source: string,
    call: CallOptions,
    options?: EvaluateOptions
  ): Promise<void>;

  export class TypedValue<T> {
    type: string;
    value: string;
    objValue?: T;
  }
}
