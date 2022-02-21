import { ethers } from 'ethers';

export interface Web3 {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  connectToWeb3Modal: () => Promise<void>;
  disconnectFromWeb3Modal: () => Promise<void>;
  error: boolean;
}

interface NFT {
  owner: string;
  tokenId: string;
  tokenUri: string;
  deposited: boolean;
  approvedAddress: string;
}
