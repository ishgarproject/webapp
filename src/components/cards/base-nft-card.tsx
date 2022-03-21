import React from 'react';
import Link from 'next/link';
import { Flex, Text, Image } from '@chakra-ui/react';

export interface IBaseNftCard {
  name: string | null;
  tokenId: string;
  imageUri: string | null;
  collectionAddress?: string;
  isLink?: boolean;
}

const ConditionalLinkWrapper: React.FC<{ condition: boolean; href?: string }> = ({ condition, href, children }) => {
  return condition ? (
    <Link href={href || '/'} passHref>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

export const BaseNftCard: React.FC<IBaseNftCard> = ({
  name,
  imageUri,
  collectionAddress,
  tokenId,
  isLink,
  children,
}) => {
  return (
    <ConditionalLinkWrapper
      condition={isLink !== undefined ? isLink : false}
      href={`/collection/${collectionAddress}/${tokenId}`}
    >
      <Flex flexDir="column" borderRadius="lg" borderWidth="1px" _hover={{ cursor: isLink ? 'pointer' : 'default' }}>
        <Image src={imageUri || ''} alt="nft-card-img" borderTopRadius="lg" />
        <Flex flexDir="column" justify="center" h="60px" px="5%" py="13%">
          <Text>{name}</Text>
          {children}
        </Flex>
      </Flex>
    </ConditionalLinkWrapper>
  );
};

BaseNftCard.defaultProps = {
  isLink: false,
};

export default BaseNftCard;
