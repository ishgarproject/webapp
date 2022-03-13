import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Stack, Grid, GridItem } from '@chakra-ui/react';
import { BaseNftCard } from '~/components';
import trpc from '~/modules/trpc';

const Collection: NextPage = () => {
  const { query } = useRouter();
  const { data } = trpc.useQuery(['vault.collection', { address: query.address as string }]);
  console.log('data', data);
  return (
    <>
      <Head>
        <title>Ishgar</title>
        <meta name="description" content="Ishgar: Order book on Starknet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack p="4%">
        <Grid templateColumns="repeat(6, 1fr)" gap="6">
          {data?.map(({ id, tokenId, imageUri }) => (
            <GridItem key={id}>
              <BaseNftCard tokenId={tokenId} imageUri={imageUri}></BaseNftCard>
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default Collection;
