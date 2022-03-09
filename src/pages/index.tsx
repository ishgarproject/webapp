import type { NextPage } from 'next';
import Head from 'next/head';
import { Stack, Text } from '@chakra-ui/react';
import { useWeb3Context } from '~/modules/context/web3-context';
import { Collection } from '~/components';
import trpc from '~/modules/trpc';

const Home: NextPage = () => {
  const { address } = useWeb3Context();
  const { data } = trpc.useQuery(['account.nfts', { address }]);
  console.log('data', data);
  return (
    <>
      <Head>
        <title>Ishgar</title>
        <meta name="description" content="Ishgar: Order book on Starknet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction="column" p="2%" spacing="8">
        <Text fontSize="3xl" fontWeight="bold">
          Profile
        </Text>
        {data?.map((collection) => (
          <Collection key={collection.address} {...collection} />
        ))}
      </Stack>
    </>
  );
};

export default Home;
