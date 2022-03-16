import React from 'react';
import { Stack, Box, Button, Text, Image, Divider } from '@chakra-ui/react';
import { EthereumLogo } from '~/components';

interface NftCard {
  collectionName: string;
  tokenId: string;
  imageUri: string | null;
  highestAsk: number | null;
}

export const NftCard: React.FC<NftCard> = ({ collectionName, tokenId, imageUri, highestAsk }) => {
  const name = `${collectionName} #${tokenId}`;
  return (
    <Stack
      direction="column"
      spacing="0"
      bg="#21262a"
      borderRadius="lg"
      _hover={{ cursor: 'pointer', bg: '#343a40', transition: '0.1s' }}
    >
      <Box w="220px" maxH="250px" py="8%" display="flex" justifyContent="center">
        <Image src={imageUri || ''} alt="nft-card" maxW="200px" maxH="250px" />
      </Box>
      <Stack
        direction="column"
        justify="space-between"
        align="flex-start"
        minH="120px"
        px="6%"
        py="4%"
        // bg="#343a40"
        borderBottomRadius="lg"
      >
        <Text fontSize="sm">{name}</Text>
        <Stack direction="row" h="30px" spacing="1" align="center">
          <EthereumLogo />
          <Text>{highestAsk || '---'}</Text>
        </Stack>
        <Divider />
        <Button variant="unstyled" size="sm">
          Make Offer
        </Button>
      </Stack>
    </Stack>
  );
};

export default NftCard;
