import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';

export interface IBaseNftCard {
  name: string | null;
  tokenId: string;
  imageUri: string | null;
  collectionAddress?: string;
}

export const BaseNftCard: React.FC<IBaseNftCard> = ({ name, imageUri, children }) => {
  return (
    <Flex flexDir="column" borderRadius="lg" borderWidth="1px">
      <Image src={imageUri || ''} alt="nft-card-img" />
      <Flex flexDir="column" justify="center" h="60px" px="5%" py="13%">
        <Text>{name}</Text>
        {children}
      </Flex>
    </Flex>
  );
};

export default BaseNftCard;
