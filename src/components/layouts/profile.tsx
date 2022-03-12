import type { NextPage } from 'next';
import Head from 'next/head';
import { Stack, Box, Avatar } from '@chakra-ui/react';
import { Navbar, AddressField, Tabs } from '~/components';

const ProfileLayout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Ishgar</title>
        <meta name="description" content="Ishgar: Order book on Starknet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h="100vh" w="100vw" minH="100vh" maxW="100vw" overflowX="hidden">
        <Navbar />
        <Stack direction="column">
          <Stack h="40vh" direction="column" spacing="0">
            <Box h="45%" bg="#151b22" />
            <Stack h="55%" direction="column" justify="space-between" pb="1%">
              <Stack align="center">
                <Avatar size="2xl" mt="-16" src="/avatar-fallback.jpg" />
                <AddressField />
              </Stack>
              <Tabs />
            </Stack>
          </Stack>
          {children}
        </Stack>
      </Box>
    </>
  );
};

export default ProfileLayout;
