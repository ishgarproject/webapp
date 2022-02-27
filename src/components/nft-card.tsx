import React from 'react';
import { Stack, VStack, Text } from '@chakra-ui/react';
import type { ERC721 } from '~/modules/types';

export const NftCard: React.FC<ERC721> = () => {
  return (
    <Stack justifyContent="center" h="300" bg="blue.500" spacing="0">
      <VStack h="50%" bg="blue.200">
        <Text>Collection Card</Text>
      </VStack>
      <VStack h="50%" bg="red.500">
        <Text>Henlo</Text>
      </VStack>
    </Stack>
  );
};

export default NftCard;
