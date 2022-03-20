import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Divider } from '@chakra-ui/react';
import { SidebarProfile } from '~/views/profile/collection';
import { useWeb3Context } from '~/modules/context/web3-context';
import { useIshgar, useERC721 } from '~/modules/hooks/use-contract';
import { Head, CollectionBanner, BannerLabel, NftsList } from '~/components';
import type { LayerNetwork } from '~/modules/types';
import { truncateMiddleOfAddress } from '~/modules/helpers';
import trpc from '~/modules/trpc';

// FIX: Too many re-renders
export const ProfileCollection: NextPage = () => {
  const collectionAddress = useRouter().query?.collectionAddress?.toString();
  const { address } = useWeb3Context();
  const [layerNetwork, setLayerNetwork] = useState<LayerNetwork>('ethereum');
  const { data: collection } = trpc.useQuery([
    'account.collection',
    { ownerAddress: address, collectionAddress, layerNetwork },
  ]);
  const { name, totalTokensOnL1, totalTokensOnL2 } = collection || {};
  const { depositNft } = useIshgar();
  const { approve } = useERC721(collectionAddress!);

  const buttonAction = (tokenId: string, approvedVault: boolean) => {
    if (approvedVault) return depositNft(collectionAddress!, tokenId);
    return approve(tokenId);
  };

  const buttonLabel = (approvedVault?: boolean) => (approvedVault ? 'Deposit' : 'Approve');

  return (
    <>
      <Head />
      <Flex flexDir="row" minH="91vh">
        <SidebarProfile network={layerNetwork} setNetwork={setLayerNetwork} />
        <Flex flexDir="column" flex="1">
          <CollectionBanner name={name}>
            <BannerLabel label="Ethereum" value={`${totalTokensOnL1} Items`} />
            <Divider orientation="vertical" />
            <BannerLabel label="Starknet" value={`${totalTokensOnL2} Items`} />
            <Divider orientation="vertical" />
            <BannerLabel label="Collection address" value={truncateMiddleOfAddress(address)} />
          </CollectionBanner>
          <NftsList
            collectionAddress={collectionAddress}
            tokens={collection?.tokens}
            buttonLabel={buttonLabel}
            buttonAction={buttonAction}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default ProfileCollection;
