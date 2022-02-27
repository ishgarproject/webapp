import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Stack, Text } from '@chakra-ui/react';
import { OrdersActivity } from '~/components';

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Ishgar</title>
        <meta name="description" content="Ishgar: Order book on Starknet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction="column" p="2%" spacing="8">
        <Text fontSize="3xl" fontWeight="bold">
          Welcome to Ishgar
        </Text>
        <OrdersActivity title="Recent orders" />
      </Stack>
    </Box>
  );
};

export default Home;
