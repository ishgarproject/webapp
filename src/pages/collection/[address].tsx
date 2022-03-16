import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Stack, Text, Image, Icon, Grid, GridItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { MarketplaceSidebar } from '~/components/sidebars/marketplace-sidebar';
import { Head, NftCard } from '~/components';
import { truncateMiddleOfAddress } from '~/helpers';
import trpc from '~/modules/trpc';

const Collection: NextPage = () => {
  const { query } = useRouter();
  const [buyNow, setBuyNow] = useState(false);
  const { data } = trpc.useQuery(['vault.collection', { address: query.address as string, buyNow: true }]);
  console.log('data', data);

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
        >
          <Stack direction="row" align="center">
            <Image src={data?.tokens[0].imageUri || ''} alt="collection-logo" w="100px" />
            <Stack direction="column">
              <Text fontSize="2xl">{data?.name}</Text>
              <Stack direction="row" align="center">
                <Text color="gray.400">{truncateMiddleOfAddress(data?.address)}</Text>
                <Icon as={ExternalLinkIcon} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" minH="94vh" spacing="4">
          <MarketplaceSidebar buyNow={buyNow} switchBuyNow={switchBuyNow} />
          <Grid templateColumns="repeat(6, 1fr)" gap="6" pt="1%">
            {data?.tokens.map(({ id, tokenId, imageUri }) => (
              <GridItem key={id}>
                <NftCard collectionName={data.name} tokenId={tokenId} imageUri={imageUri} />
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};

export default Collection;
