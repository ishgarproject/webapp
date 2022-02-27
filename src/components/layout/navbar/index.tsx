import React from 'react';
import { Stack, Button, Spacer, Text } from '@chakra-ui/react';
import { useWeb3Context } from '~/modules/context/web3-context';

export const Navbar: React.FC = () => {
  const { provider, connectToWeb3Modal, disconnectFromWeb3Modal } = useWeb3Context();
  return (
    <Stack direction="row" h="6vh" maxH="6vh" px="4%" align="center" borderBottom="1px" borderColor="grey">
      <Text>Ishgar</Text>
      <Spacer />
      <Stack direction="row">
        <Button colorScheme="blue" onClick={provider ? disconnectFromWeb3Modal : connectToWeb3Modal}>
          {provider ? 'Disconnect' : 'Connect'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Navbar;
