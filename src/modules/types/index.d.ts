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
