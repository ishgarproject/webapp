import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Stack, Grid, GridItem, Text } from '@chakra-ui/react';
import { VaultActivity } from '~/components';
import { useNFTsDeposited } from '~/modules/hooks/use-nfts';

const Vault: NextPage = () => {
  const { nfts } = useNFTsDeposited();
  return (
    <Box>
      <Head>
        <title>Ishgar Vault</title>
        <meta name="description" content="Ishgar: Order book on Starknet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction="column" p="2%" spacing="8">
        <Text fontSize="3xl" fontWeight="bold">
          Vault
        </Text>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={8}>
          <GridItem>
            <VaultActivity title="Recent deposits" data={nfts} />
          </GridItem>
          <GridItem>
            <VaultActivity title="Recent withdraws" />
          </GridItem>
        </Grid>
      </Stack>
    </Box>
  );
};

export default Vault;
