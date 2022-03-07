import React from 'react';
import { Stack, Grid, GridItem, Text, Divider } from '@chakra-ui/react';
import { Contract, Token } from '@prisma/client';
import NftCard from './nft-card';

type ICollection = Contract & { tokens: Token[] };

export const Collection: React.FC<ICollection> = ({ address, tokens }) => {
  return (
    <Stack direction="column" spacing="6">
      <Text>Contract: {address}</Text>
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {tokens.map((token) => (
          <GridItem key={token.tokenId}>
            <NftCard {...token} />
          </GridItem>
        ))}
      </Grid>
      <Divider />
    </Stack>
  );
};

export default Collection;
