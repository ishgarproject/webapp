import { useMemo } from 'react';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import useWeb3 from './use-web3';
import IshgarVaultAbi from '~/abis/IshgarVault.json';
import MockERC721Abi from '~/abis/MockERC721.json';
import type { IshgarVault, MockERC721 } from '~/abis/types';
import { ISHGAR_VAULT_ADDRESS, MOCK_ERC721_ADDRESS } from '~/constants';
import { getContract } from '~/modules/utils/web3';

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
      return getContract<T>(address, ABI, provider, withSignerIfPossible && signer ? signer : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, signer]);
}

export function useIshgar(withSignerIfPossible?: boolean) {
  return useContract<IshgarVault>(ISHGAR_VAULT_ADDRESS, IshgarVaultAbi, withSignerIfPossible);
}

export function useMockERC721(withSignerIfPossible?: boolean) {
  const contract = useContract<MockERC721>(MOCK_ERC721_ADDRESS, MockERC721Abi, withSignerIfPossible);

  const mint = async () => {
    if (!contract) {
      return;
    }
    const tx = await contract.mint();
    console.log(tx);
  };

  return { contract, mint };
}
