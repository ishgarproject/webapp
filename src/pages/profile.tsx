import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Stack, Text } from '@chakra-ui/react';
import trpc from '~/modules/trpc';
import { NftCollectionSection } from '~/components';

const address = '0x43020FC9f3E070dD9cbECAa4Ce86a51992EdDDA4';

const Profile: NextPage = () => {
  const { data: erc721s } = trpc.useQuery(['account.nfts', { address }]);
  console.log('erc721s', erc721s);
  return (
    <Box>
      <Head>
        <title>Ishgar</title>
        <meta name="description" content="Ishgar: Order book on Starknet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction="column" p="2%" spacing="8">
        <Text fontSize="3xl" fontWeight="bold">
          Profile
        </Text>
        <Stack direction="column">
          {erc721s?.map((erc721, index) => (
            <NftCollectionSection key={index} {...erc721} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Profile;
