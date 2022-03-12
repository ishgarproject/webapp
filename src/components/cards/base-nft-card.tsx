import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

interface IBaseNftCard {
  tokenId: string;
  imageUri: string | null;
}

export const BaseNftCard: React.FC<IBaseNftCard> = ({ tokenId, imageUri, children }) => (
  <Box>
    <Image src={imageUri || ''} minW="200px" />
    <Box px="3" py="2" pt="4" mt="-1" bg="#343a40" borderBottomRadius="lg">
      <Text>#{tokenId}</Text>
      {children}
    </Box>
  </Box>
);

export default BaseNftCard;
