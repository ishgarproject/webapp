import React, { createContext, useContext } from 'react';
import type { Web3 } from '~/modules/types';
import useWeb3 from '~/modules/hooks/use-web3';

const Web3Context = createContext<Web3>({
  connectToWeb3Modal: async () => {},
  disconnectFromWeb3Modal: async () => {},
  error: false,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const web3 = useWeb3();
  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};

export const useWeb3Context = () => useContext(Web3Context);
