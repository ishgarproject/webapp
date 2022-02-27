import { useState, useEffect, useMemo, useCallback } from 'react';
import Web3Modal, { IProviderOptions } from 'web3modal';
import { ethers } from 'ethers';

const providerOptions: IProviderOptions = {};

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<{
    provider?: ethers.providers.Web3Provider;
    signer?: ethers.providers.JsonRpcSigner;
    address?: string;
    chainId?: number;
  }>();
  const [error, setError] = useState(false);

  const web3Modal = useMemo(() => {
    return typeof window !== 'undefined'
      ? new Web3Modal({
          cacheProvider: true,
          providerOptions,
        })
      : null;
  }, []);

  const connectToWeb3Modal = useCallback(async () => {
    setError(false);
    try {
      const web3ModalInstance = await web3Modal?.connect();
      const provider = new ethers.providers.Web3Provider(web3ModalInstance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      setWeb3({ provider, signer, address, chainId: network.chainId });
    } catch (e) {
      console.error(e);
      setError(true);
    }
  }, []);

  const disconnectFromWeb3Modal = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      setWeb3({});
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (web3Modal?.cachedProvider) {
        await connectToWeb3Modal();
      }
    })();
  }, [web3Modal]);

  return {
    ...web3,
    connectToWeb3Modal,
    disconnectFromWeb3Modal,
    error,
  };
};

export default useWeb3;
