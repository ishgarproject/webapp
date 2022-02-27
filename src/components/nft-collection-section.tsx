import React from 'react';
import { Stack, Text } from '@chakra-ui/react';
import type { ERC721 } from '~/modules/types';

export const NftCollectionSection: React.FC<ERC721> = ({ address }) => {
  return (
    <Stack>
      <Text>Contract address: {address}</Text>
    </Stack>
  );
};

export default NftCollectionSection;
