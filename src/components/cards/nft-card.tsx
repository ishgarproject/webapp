import React from 'react';
import { Stack, Text, Image } from '@chakra-ui/react';
import { EthereumLogo } from '~/components';

interface NftCard {
  collectionName: string;
  tokenId: string;
  imageUri: string | null;
}

export const NftCard: React.FC<NftCard> = ({ collectionName, tokenId, imageUri }) => {
  const name = `${collectionName} #${tokenId}`;
  return (
    <Stack direction="column" spacing="0">
      <Image src={imageUri || ''} alt="nft-card" w="200px" />
      <Stack direction="column" minH="60px" p="3%" bg="#343a40" borderBottomRadius="lg">
        <Text fontSize="sm">{name}</Text>
        <Stack direction="row" spacing="1">
          <EthereumLogo />
          <Text>25</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NftCard;
