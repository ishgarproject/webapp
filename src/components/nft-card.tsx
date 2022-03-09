import React from 'react';
import { Box, Stack, Image, Text, Button } from '@chakra-ui/react';
import { Token } from '@prisma/client';
import { ISHGAR_VAULT_ADDRESS } from '~/constants';

interface INftCard extends Token {
  approve: (tokenId: number) => Promise<void>;
  depositNft: (erc721Address: string, tokenId: number) => Promise<void>;
}

export const NftCard: React.FC<INftCard> = ({ contract, tokenId, imageUri, approvedAddress, approve, depositNft }) => {
  // TODO: handle 'hasApproved' on backend
  const hasApproved = approvedAddress?.toLowerCase() === ISHGAR_VAULT_ADDRESS.toLowerCase();
  return (
    <Box>
      <Image src={imageUri || ''} minW="200px" />
      <Box px="3" py="2" pt="4" mt="-1" bg="#343a40" borderBottomRadius="lg">
        <Text></Text>
        <Text>#{tokenId}</Text>
        <Stack direction="row" justify="flex-end">
          <Button variant="ghost" size="sm" onClick={() => approve(tokenId)} disabled={hasApproved}>
            {hasApproved ? 'Approved' : 'Approve'}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => depositNft(contract, tokenId)}>
            Deposit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NftCard;
