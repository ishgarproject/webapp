import React from 'react';
import { Stack, Grid, GridItem, Divider } from '@chakra-ui/react';
import { Contract, Token } from '@prisma/client';
import { useERC721, useIshgar } from '~/modules/hooks/use-contract';
import { OwnedNftCard } from './cards';

type ICollection = Contract & { tokens: Token[] };

export const Collection: React.FC<ICollection> = ({ address, tokens }) => {
  const { approve } = useERC721(address, true);
  // TODO: move ishgar inside a parent or context to avoid duplicate
  const { depositNft } = useIshgar(true);
  return (
    <Stack direction="column" spacing="6">
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {tokens.map((token) => (
          <GridItem key={token.tokenId}>
            <OwnedNftCard {...token} approve={approve} depositNft={depositNft} />
          </GridItem>
        ))}
      </Grid>
      <Divider />
    </Stack>
  );
};

export default Collection;