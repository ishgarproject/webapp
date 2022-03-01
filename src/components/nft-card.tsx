import React from 'react';
import { VStack, Stack, Text, Image, Button } from '@chakra-ui/react';
import { useIshgar, useMockERC721 } from '~/modules/hooks/use-contract';
import type { Nft } from '~/modules/types';

export const NftCard: React.FC<{ erc721Address: string } & Nft> = ({
  erc721Address,
  tokenId,
  tokenIdWithLeadingZeros,
  tokenUri,
}) => {
  const { depositNft } = useIshgar();
  const { approve, mint } = useMockERC721();
  return (
    <VStack maxW="300px">
      <Stack direction="column" align="center" justifyContent="center" spacing="-2">
        <Image src={tokenUri} alt="nft-img" objectFit="cover" />
        <Stack w="100%" px="2" py="1" bg="#343a40" direction="column" borderBottomRadius="md">
          <Text>#{tokenIdWithLeadingZeros}</Text>
          <Stack direction="row" justify="flex-end">
            <Button variant="ghost" onClick={() => mint()}>
              Mint
            </Button>
            <Button variant="ghost" onClick={() => approve(tokenId)}>
              Approve
            </Button>
            <Button variant="ghost" onClick={() => depositNft(erc721Address, tokenId)}>
              Deposit
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </VStack>
  );
};

export default NftCard;
