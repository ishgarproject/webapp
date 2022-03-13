import React from 'react';
import { Button } from '@chakra-ui/react';
import EthereumLogo from './ethereum-logo';
import { truncateMiddleOfAddress } from '~/helpers';

export const AddressField: React.FC = () => {
  return (
    <Button size="sm" leftIcon={<EthereumLogo />}>
      {truncateMiddleOfAddress('0x43020FC9f3E070dD9cbECAa4Ce86a51992EdDDA4')}
    </Button>
  );
};

export default AddressField;
