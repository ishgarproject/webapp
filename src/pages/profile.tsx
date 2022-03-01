import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Stack, Text, Divider } from '@chakra-ui/react';
import { NftCollectionSection, Loader } from '~/components';
import trpc from '~/modules/trpc';
import { useWeb3Context } from '~/modules/context/web3-context';

const Profile: NextPage = () => {
  const { address } = useWeb3Context();
  const { data: erc721s, isLoading } = trpc.useQuery(['account.nfts', { address }]);
  console.log('erc721s', erc721s);

  if (isLoading) {
    return <Loader />;
  }

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
        <Stack direction="column" spacing="6">
          {erc721s?.map((erc721) => (
            <Stack key={erc721.address} spacing="4">
              <NftCollectionSection {...erc721} />
              <Divider />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Profile;
