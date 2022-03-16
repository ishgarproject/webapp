import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Stack, Text, Image, Icon, Grid, GridItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { MarketplaceSidebar } from '~/components/sidebars/marketplace-sidebar';
import { Head, NftCard } from '~/components';
import { truncateMiddleOfAddress } from '~/helpers';
import trpc from '~/modules/trpc';

interface ICollectionStats {
  floor?: number | null;
  totalVolume?: number | null;
  totalTokensAvailable?: number | null;
}

const CollectionStats: React.FC<ICollectionStats> = ({ floor, totalVolume, totalTokensAvailable }) => {
  return (
    <Stack direction="row" spacing="0" borderRadius="20px">
      <Text px="4" py="1" textAlign="center" fontSize="sm" color="gray.400" bg="#04111d" borderRightWidth="0.5px">
        Floor: {floor || '---'}
      </Text>
      <Text px="4" py="1" textAlign="center" fontSize="sm" color="gray.400" bg="#04111d" borderRightWidth="0.5px">
        Total Vol: {totalVolume || '---'}
      </Text>
      <Text px="4" py="1" textAlign="center" fontSize="sm" color="gray.400" bg="#04111d" borderRightWidth="0.5px">
        Items: {totalTokensAvailable || '---'}
      </Text>
    </Stack>
  );
};

const Collection: NextPage = () => {
  const { query } = useRouter();
  const [buyNow, setBuyNow] = useState(false);
  const { data: collection } = trpc.useQuery(['vault.collection', { address: query.address as string, buyNow }]);
  console.log('collection', collection);

  const switchBuyNow = () => {
    setBuyNow(!buyNow);
  };

  return (
    <>
      <Head />
      <Stack direction="column" spacing="0">
        <Stack
          direction="column"
          h="20vh"
          px="2%"
          py="1%"
          bg="#21262a"
          borderBottomWidth="0.5px"
          borderBottomColor="gray.700"
          justify="space-evenly"
        >
          <Stack direction="row" align="center">
            <Image
              src={collection?.tokens[0]?.imageUri || ''}
              alt="collection-logo"
              w="100px"
              maxH="100px"
              fallbackSrc="/avatar-fallback.jpg"
            />
            <Stack direction="column">
              <Text fontSize="2xl">{collection?.name}</Text>
              <Stack direction="row" align="center">
                <Text color="gray.400">{truncateMiddleOfAddress(collection?.address)}</Text>
                <Icon as={ExternalLinkIcon} />
              </Stack>
            </Stack>
          </Stack>
          <CollectionStats {...collection?.stats} />
        </Stack>
        <Stack direction="row" minH="94vh" spacing="4">
          <MarketplaceSidebar buyNow={buyNow} switchBuyNow={switchBuyNow} />
          <Grid templateColumns={{ base: 'repeat(4, 1fr)' }} gap="6" pt="1%">
            {collection?.tokens.map((token) => (
              <GridItem key={token.id}>
                <NftCard collectionName={collection?.name} {...token} />
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};

export default Collection;
