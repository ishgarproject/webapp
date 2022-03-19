import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import { SidebarProfile, CollectionBanner, NftsList } from '~/views/profile/collection';
import { useWeb3Context } from '~/modules/context/web3-context';
import { Head } from '~/components';
import type { LayerNetwork } from '~/modules/types';
import trpc from '~/modules/trpc';

// FIX: Too many re-renders
export const ProfileCollection: NextPage = () => {
  const collectionAddress = useRouter().query?.collectionAddress?.toString();
  const { address } = useWeb3Context();
  const [layerNetwork, setLayerNetwork] = useState<LayerNetwork>('ethereum');
  const { data } = trpc.useQuery(['account.collection', { ownerAddress: address, collectionAddress, layerNetwork }]);
  const { name, totalTokensOnL1, totalTokensOnL2 } = data || {};
  return (
    <>
      <Head />
      <Flex flexDir="row" minH="91vh">
        <SidebarProfile network={layerNetwork} setNetwork={setLayerNetwork} />
        <Flex flexDir="column" flex="1">
          <CollectionBanner
            name={name}
            address={collectionAddress}
            totalTokensOnL1={totalTokensOnL1}
            totalTokensOnL2={totalTokensOnL2}
          />
          {data?.tokens && <NftsList collectionAddress={collectionAddress!} tokens={data.tokens} />}
        </Flex>
      </Flex>
    </>
  );
};

export default ProfileCollection;
