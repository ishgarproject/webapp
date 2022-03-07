import React from 'react';
import { Box, Stack, Image, Text, Button } from '@chakra-ui/react';
import { Token } from '@prisma/client';

export const NftCard: React.FC<Token> = ({ tokenId, imageUri }) => {
  return (
    <Box>
      <Image src={imageUri || ''} />
      <Box px="3" py="2" pt="4" mt="-1" bg="#343a40" borderBottomRadius="lg">
        <Text></Text>
        <Text>#{tokenId}</Text>
        <Stack direction="row" justify="flex-end">
          <Button variant="ghost" size="sm">
            Approve
          </Button>
          <Button variant="ghost" size="sm">
            Deposit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NftCard;
