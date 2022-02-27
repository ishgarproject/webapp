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

export interface ERC721 {
  address: string;
  name?: string;
  nfts: { tokenId: number; gateway?: string }[];
}

export interface OwnedERC721s {
  [key: string]: ERC721;
}
