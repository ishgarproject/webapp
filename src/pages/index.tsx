import type { NextPage } from 'next';
import Head from 'next/head';
import { Stack, Text } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ishgar</title>
        <meta name="description" content="Ishgar: Order book on Starknet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction="column" p="2%" spacing="8">
        <Text fontSize="3xl" fontWeight="bold">
          Henlo
        </Text>
      </Stack>
    </>
  );
};

export default Home;
