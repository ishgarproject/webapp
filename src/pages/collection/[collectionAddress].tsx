import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Stack, Grid, GridItem } from '@chakra-ui/react';
import { MarketplaceSidebar } from '~/components/sidebars/marketplace-sidebar';
import { CollectionBanner } from '~/views/collection/collection-banner';
import { Head, NftCard } from '~/components';
import trpc from '~/modules/trpc';

const Collection: NextPage = () => {
  const {
    query: { collectionAddress },
  } = useRouter();
  const [buyNow, setBuyNow] = useState(false);
  const { data: collection } = trpc.useQuery(['vault.collection', { address: collectionAddress as string, buyNow }]);
  console.log('collection', collection);

  const switchBuyNow = () => {
    setBuyNow(!buyNow);
  };

  return (
    <>
      <Head />
      <Stack direction="column" spacing="0">
        <CollectionBanner
          name={collection?.name}
          address={collection?.address}
          logoUri={collection?.tokens[0].imageUri}
          stats={collection?.stats}
        />
        <Stack direction="row" minH="94vh" spacing="4">
          <MarketplaceSidebar buyNow={buyNow} switchBuyNow={switchBuyNow} />
          <Grid templateColumns={{ base: 'repeat(4, 1fr)' }} gap="6" pt="1%">
            {collection?.tokens.map((token) => (
              <GridItem key={token.id}>
                <NftCard {...token} collectionName={collection?.name} collectionAddress={collection?.address} />
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};

export default Collection;
