import React from 'react';
import { Button } from '@chakra-ui/react';
import { useWeb3Context } from '~/modules/context/web3-context';
import EthereumLogo from './ethereum-logo';
import { truncateMiddleOfAddress } from '~/helpers';

export const AddressField: React.FC = () => {
  const { address } = useWeb3Context();
  return (
    <Button size="sm" leftIcon={<EthereumLogo />}>
      {truncateMiddleOfAddress(address)}
    </Button>
  );
};

export default AddressField;
