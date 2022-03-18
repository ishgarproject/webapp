import { ethers } from 'ethers';

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

export interface BaseNftInfo {
  id: number;
  tokenId: string;
  owner: HashString;
  imageUri: string | null;
  collectionName: string;
  collectionAddress: HashString;
}
