import { useMemo } from 'react';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import useWeb3 from './use-web3';
import { getContract } from '~/modules/utils/web3';
import IshgarVaultAbi from '~/abis/IshgarVault.json';
import MockERC721Abi from '~/abis/MockERC721.json';
import type { IshgarVault, MockERC721 } from '~/abis/types';
import { ISHGAR_VAULT_ADDRESS } from '~/constants';

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
  const contract = useContract<IshgarVault>(ISHGAR_VAULT_ADDRESS, IshgarVaultAbi, withSignerIfPossible);

  const depositNft = async (erc721Address: string, tokenId: string) => {
    try {
      const tx = await contract?.depositNFT(erc721Address, tokenId);
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    contract,
    depositNft,
  };
}

export function useERC721(address: string, withSignerIfPossible?: boolean) {
  const contract = useContract<MockERC721>(address, MockERC721Abi, withSignerIfPossible);

  const mint = async () => {
    try {
      const tx = await contract?.mint();
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  };

  const approve = async (tokenId: string) => {
    try {
      const tx = await contract?.approve(ISHGAR_VAULT_ADDRESS, tokenId);
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  };

  return { contract, mint, approve };
}
