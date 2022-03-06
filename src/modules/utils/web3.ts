import { Web3Provider, AlchemyProvider, JsonRpcSigner } from '@ethersproject/providers';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

function getSigner(provider: Web3Provider | AlchemyProvider, signer: JsonRpcSigner): JsonRpcSigner {
  return provider.getSigner(signer._address).connectUnchecked();
}

function getProviderOrSigner(
  provider: Web3Provider | AlchemyProvider,
  signer?: JsonRpcSigner
): Web3Provider | AlchemyProvider | JsonRpcSigner {
  return signer ? getSigner(provider, signer) : provider;
}

export function getContract<T extends Contract = Contract>(
  address: string,
  ABI: ContractInterface,
  provider: Web3Provider | AlchemyProvider,
  signer?: JsonRpcSigner
): T {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(provider, signer)) as T;
}
