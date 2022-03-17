import React from 'react';
import { Stack, Text, Image, Icon } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import type { HashString } from '~/modules/types';
import { CollectionStats, type ICollectionStats } from './collection-stats';

interface ICollectionBanner {
  logoUri?: string | null;
  name?: string;
  address?: HashString;
  stats?: ICollectionStats;
}

export const CollectionBanner: React.FC<ICollectionBanner> = ({ logoUri, name, address, stats }) => {
  return (
    <Stack
      direction="column"
      h="20vh"
      px="2%"
      py="1%"
      bg="#21262a"
      borderBottomWidth="0.5px"
      borderBottomColor="gray.700"
      justify="space-evenly"
    >
      <Stack direction="row" align="center">
        <Image src={logoUri || ''} alt="collection-logo" w="100px" maxH="100px" fallbackSrc="/avatar-fallback.jpg" />
        <Stack direction="column">
          <Text fontSize="2xl">{name}</Text>
          <Stack direction="row" align="center">
            <Text color="gray.400">{address?.truncated}</Text>
            <Icon as={ExternalLinkIcon} />
          </Stack>
        </Stack>
      </Stack>
      <CollectionStats {...stats} />
    </Stack>
  );
};

export default ICollectionBanner;
