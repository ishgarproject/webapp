import React from 'react';
import { Stack, Text, Image } from '@chakra-ui/react';

export const ItemCard: React.FC<{ tokenId: string; tokenUri: string }> = ({ tokenId, tokenUri }) => {
  return (
    <Stack direction="row">
      <Image boxSize="70px" src={tokenUri} alt="bayc" />
      <Stack direction="column" justify="center" w="80%">
        <Text fontWeight="bold">Bored Ape Yatch Club</Text>
        <Text>#{tokenId}</Text>
      </Stack>
    </Stack>
  );
};

export default ItemCard;
