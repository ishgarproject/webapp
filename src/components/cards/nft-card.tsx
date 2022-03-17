import React, { useState } from 'react';
import Link from 'next/link';
import { Stack, Box, Text, Image, Divider } from '@chakra-ui/react';
import { BaseNftInfo } from '~/modules/types';
import { MakeOfferModal, EthereumLogo } from '~/components';

interface INftCard extends BaseNftInfo {
  highestAsk: number | null;
}

export const NftCard: React.FC<INftCard> = (props) => {
  const { tokenId, imageUri, collectionName, collectionAddress, highestAsk } = props;
  const [isActive, setIsActive] = useState<boolean>(false);
  const name = `${collectionName} #${tokenId}`;
  const itemUri = `/collection/${collectionAddress.full}/${tokenId}`;
  return (
    <Stack
      direction="column"
      bg="#21262a"
      spacing="0"
      borderRadius="lg"
      _hover={{ cursor: 'pointer', bg: '#343a40', transition: '0.1s' }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Link href={itemUri} passHref>
        <Stack direction="column" spacing="0">
          <Box w="220px" maxH="250px" py="8%" display="flex" justifyContent="center">
            <Image src={imageUri || ''} alt="nft-card" maxW="200px" maxH="250px" />
          </Box>
          <Stack
            direction="column"
            justify="space-between"
            align="flex-start"
            minH="90px"
            px="6%"
            py="4%"
            borderBottomRadius="lg"
          >
            <Text fontSize="sm">{name}</Text>
            <Stack direction="row" h="20px" spacing="1" align="center">
              <EthereumLogo />
              <Text>{highestAsk || '---'}</Text>
            </Stack>
            <Divider />
          </Stack>
        </Stack>
      </Link>
      <Box display="flex" justifyItems="flex-end" px="6%" pb="4%">
        <MakeOfferModal {...props} isActive={isActive} />
      </Box>
    </Stack>
  );
};

export default NftCard;
