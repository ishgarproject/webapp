import { useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Text } from '@chakra-ui/react';
import type { NextPageWithLayout } from '~/pages/_app';
import { useWeb3Context } from '~/modules/context/web3-context';
import { ProfileLayout } from '~/components/layouts/profile';
import { ProfileSidebar } from '~/components/sidebars/profile-sidebar';
import { Head } from '~/components';
import { CollectionDisplayList } from '~/views/profile/collection/collection-display-list';
import { truncateMiddleOfAddress } from '~/helpers';
import type { LayerNetwork } from '~/modules/types';
import trpc from '~/modules/trpc';

interface IProfileCollectionInfo {
  name?: string;
  address?: string;
  totalTokensOnL1?: number;
  totalTokensOnL2?: number;
}

const Info: React.FC<{ title?: string; value?: string }> = ({ title, value }) => {
  return (
    <Stack direction="column">
      <Text fontSize="sm" color="gray.400" textTransform="uppercase" fontWeight="bold">
        {title}
      </Text>
      <Text>{value}</Text>
    </Stack>
  );
};

const ProfileCollectionInfo: React.FC<IProfileCollectionInfo> = ({
  name,
  address,
  totalTokensOnL1,
  totalTokensOnL2,
}) => {
  return (
    <Stack direction="row" h="80px" px="3%" align="center" justify="space-between" bg="#21262a" borderRadius="10px">
      <Info title="Collection" value={name} />
      <Info title="Ethereum" value={`${totalTokensOnL1} Items`} />
      <Info title="Starknet" value={`${totalTokensOnL2} Items`} />
      <Info title="Contract address" value={truncateMiddleOfAddress(address)} />
    </Stack>
  );
};

// FIX: Too many re-renders
export const ProfileCollection: NextPageWithLayout = () => {
  const collectionAddress = useRouter().query?.collectionAddress?.toString();
  const { address } = useWeb3Context();
  const [layerNetwork, setLayerNetwork] = useState<LayerNetwork>('ethereum');
  const { data } = trpc.useQuery(['account.collection', { ownerAddress: address, collectionAddress, layerNetwork }]);
  return (
    <>
      <Head />
      <Stack direction="row" minH="59vh" spacing="4">
        <ProfileSidebar layerNetwork={layerNetwork} setLayerNetwork={setLayerNetwork} />
        <Stack minW="83vw" pr="2%" spacing="6">
          <ProfileCollectionInfo
            name={data?.name}
            address={data?.address}
            totalTokensOnL1={data?.totalTokensOnL1}
            totalTokensOnL2={data?.totalTokensOnL2}
          />
          <CollectionDisplayList
            collectionAddress={collectionAddress}
            tokens={data?.tokens}
            layerNetwork={layerNetwork}
          />
        </Stack>
      </Stack>
    </>
  );
};

ProfileCollection.Layout = ProfileLayout;

export default ProfileCollection;
