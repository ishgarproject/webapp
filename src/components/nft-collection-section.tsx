import React from 'react';
import { Stack, Grid, GridItem, Text } from '@chakra-ui/react';
import NftCard from './nft-card';
import type { ERC721 } from '~/modules/types';

export const NftCollectionSection: React.FC<ERC721> = ({ address, nfts }) => {
  return (
    <Stack>
      <Text>Contract address: {address}</Text>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
        {nfts.map((nft) => (
          <GridItem key={nft.tokenId}>
            <NftCard erc721Address={address} {...nft} />
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
};

export default NftCollectionSection;
