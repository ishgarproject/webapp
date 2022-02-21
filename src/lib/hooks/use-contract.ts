import { useMemo } from 'react';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { getAddress } from '@ethersproject/address';
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';
import useWeb3 from './use-web3';
import trpc from '~/lib/trpc';
import IshgarVaultAbi from '~/abis/IshgarVault.json';
import MockERC721Abi from '~/abis/MockERC721.json';
import type { IshgarVault, MockERC721 } from '~/abis/types';
import { ISHGAR_VAULT_ADDRESS, MOCK_ERC721_ADDRESS } from '~/lib/constants';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

function getSigner(provider: Web3Provider, signer: JsonRpcSigner): JsonRpcSigner {
  return provider.getSigner(signer._address).connectUnchecked();
}

function getProviderOrSigner(provider: Web3Provider, signer?: JsonRpcSigner): Web3Provider | JsonRpcSigner {
  return signer ? getSigner(provider, signer) : provider;
}

export function getContract(address: string, ABI: any, provider: Web3Provider, signer?: JsonRpcSigner): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(provider, signer));
}

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: ContractInterface,
  withSignerIfPossible = true
): T | null {
  const { provider, signer, chainId } = useWeb3();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && signer ? signer : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, signer]) as T;
}

export function useIshgar(withSignerIfPossible?: boolean) {
  return useContract<IshgarVault>(ISHGAR_VAULT_ADDRESS, IshgarVaultAbi, withSignerIfPossible);
}

export function useMockERC721(withSignerIfPossible?: boolean) {
  const contract = useContract<MockERC721>(MOCK_ERC721_ADDRESS, MockERC721Abi, withSignerIfPossible);
  const mutation = trpc.useMutation(['mints.create']);

  const mint = async () => {
    if (contract === null) {
      return;
    }
    const { hash } = await contract.mint();
    mutation.mutate({ erc721Address: contract.address, transactionHash: hash });
  };

  return {
    contract,
    mint,
  };
}
