import type { NextPageWithLayout } from '~/pages/_app';
import { useRouter } from 'next/router';
import { Stack, Grid, GridItem, Text } from '@chakra-ui/react';
import { useWeb3Context } from '~/modules/context/web3-context';
import { useIshgar, useERC721 } from '~/modules/hooks/use-contract';
import { ProfileLayout } from '~/components/layouts/profile';
import { OwnedNftCard } from '~/components';
import { truncateMiddleOfAddress } from '~/helpers';
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
  const { depositNft } = useIshgar();
  const { approve } = useERC721(collectionAddress!);
  const { data } = trpc.useQuery(['account.collection', { ownerAddress: address, collectionAddress }]);
  console.log('data', data);
  return (
    <Stack px="4%" spacing="6">
      <ProfileCollectionInfo
        name={data?.name}
        address={data?.address}
        totalTokensOnL1={data?.totalTokensOnL1}
        totalTokensOnL2={data?.totalTokensOnL2}
      />
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {data?.tokens?.map((token) => (
          <GridItem key={token.tokenId}>
            <OwnedNftCard {...token} approve={approve} depositNft={depositNft} />
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
};

ProfileCollection.Layout = ProfileLayout;

export default ProfileCollection;
