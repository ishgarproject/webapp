import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Flex, Divider } from '@chakra-ui/react';
import { CollectionSidebar } from '~/views/collection';
import { Head, CollectionBanner, BannerLabel, NftsList } from '~/components';
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
      <Flex flexDir="row" minH="91vh">
        <CollectionSidebar buyNow={buyNow} switchBuyNow={switchBuyNow} />
        <Flex flexDir="column" flex="1">
          <CollectionBanner name={collection?.name}>
            <BannerLabel label="Floor" value={collection?.stats.floor} />
            <Divider orientation="vertical" />
            <BannerLabel label="Contract address" value={collection?.address.truncated} />
            <Divider orientation="vertical" />
          </CollectionBanner>
          <NftsList
            collectionAddress={collection?.address.full}
            tokens={collection?.tokens}
            buttonLabel="Details"
            buttonAction={() => {}}
            isLink
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Collection;
