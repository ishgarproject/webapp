import { Web3Provider, AlchemyProvider, JsonRpcSigner } from '@ethersproject/providers';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import type { ERC721 } from '~/abis/types/ERC721';
import ERC721Abi from '~/abis/ERC721.json';

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

async function getERC721Name(address: string, provider: AlchemyProvider) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  const contract = getContract<ERC721>(address, ERC721Abi, provider);
  return contract.name();
}

export async function getAllERC721Names(addresses: string[], provider: AlchemyProvider) {
  const promises: Promise<string>[] = [];
  addresses.forEach((address) => {
    promises.push(getERC721Name(address, provider));
  });
  return Promise.all(promises);
}
