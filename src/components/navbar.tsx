import React from 'react';
import Link from 'next/link';
import { Stack, Button, Spacer, Text } from '@chakra-ui/react';
import { useWeb3Context } from '~/modules/context/web3-context';

export const Navbar: React.FC = () => {
  const { provider, connectToWeb3Modal, disconnectFromWeb3Modal } = useWeb3Context();
  return (
    <Stack direction="row" w="100vw" h="6vh" maxH="6vh" position="fixed" zIndex="1" px="4%" align="center" bg="#04111d">
      <Link href="/" passHref>
        <Text fontSize="xl" _hover={{ cursor: 'pointer' }}>
          Ishgar
        </Text>
      </Link>
      <Spacer />
      <Stack direction="row">
        {itemList.map(({ id, label, href }) => (
          <Button key={id} as="a" href={href} variant="ghost">
            {label}
          </Button>
        ))}
        <Button colorScheme="blue" onClick={provider ? disconnectFromWeb3Modal : connectToWeb3Modal}>
          {provider ? 'Disconnect' : 'Connect'}
        </Button>
      </Stack>
    </Stack>
  );
};

const itemList = [
  {
    id: 0,
    label: 'Profile',
    href: '/profile',
  },
];

export default Navbar;
