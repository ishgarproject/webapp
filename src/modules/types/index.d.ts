import { ethers } from 'ethers';
import type { Token } from '@prisma/client';

export interface Web3 {
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.providers.JsonRpcSigner;
  address?: string;
  chainId?: number;
  connectToWeb3Modal: () => Promise<void>;
  disconnectFromWeb3Modal: () => Promise<void>;
  error: boolean;
}

export type LayerNetwork = 'ethereum' | 'starknet';

export type Size = 'sm' | 'lg';

export interface HashString {
  full: string;
  truncated?: string;
}

export interface BaseNft {
  id: number;
  name: string | null;
  tokenId: string;
  owner: HashString;
  imageUri: string | null;
  collectionName: string;
  collectionAddress: HashString;
  depositedInVault: boolean;
}

export type RawAttribute = {
  value: string;
  trait_type: string;
};
