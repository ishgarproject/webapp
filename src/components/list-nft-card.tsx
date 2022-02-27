import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import NFTCard from './nft-card';
import { NFT } from '~/modules/types';

export const ListNFTCard: React.FC<{ title: string; nfts?: NFT[] }> = ({ title, nfts }) => {
  return (
    <>
      <Text fontSize="xl" fontWeight="bold">
        {title}
      </Text>
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {nfts?.map((nft, index) => (
          <GridItem key={index}>
            <NFTCard {...nft} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default ListNFTCard;
