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

export interface Nft {
  tokenId: number;
  tokenIdWithLeadingZeros: string;
  tokenUri?: string;
}

export interface ERC721 {
  address: string;
  name?: string;
  nfts: Nft[];
}

export interface OwnedERC721s {
  [key: string]: ERC721;
}
