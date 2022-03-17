import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

export interface ICollectionStats {
  floor?: number | null;
  totalVolume?: number | null;
  totalTokensAvailable?: number | null;
}

export const CollectionStats: React.FC<ICollectionStats> = ({ floor, totalVolume, totalTokensAvailable }) => {
  return (
    <Stack direction="row" spacing="0" borderRadius="20px">
      <Text px="4" py="1" textAlign="center" fontSize="sm" color="gray.400" bg="#04111d" borderRightWidth="0.5px">
        Floor: {floor || '---'}
      </Text>
      <Text px="4" py="1" textAlign="center" fontSize="sm" color="gray.400" bg="#04111d" borderRightWidth="0.5px">
        Total Vol: {totalVolume || '---'}
      </Text>
      <Text px="4" py="1" textAlign="center" fontSize="sm" color="gray.400" bg="#04111d" borderRightWidth="0.5px">
        Items: {totalTokensAvailable || '---'}
      </Text>
    </Stack>
  );
};

export default CollectionStats;
