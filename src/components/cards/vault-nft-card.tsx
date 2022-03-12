import React from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { Token } from '@prisma/client';
import BaseNftCard from './base-nft-card';

interface IVaultNftCard extends Token {
  withdraw: (tokenId: string) => Promise<void>;
}

export const VaultNftCard: React.FC<IVaultNftCard> = ({ tokenId, imageUri, withdraw }) => {
  return (
    <BaseNftCard tokenId={tokenId} imageUri={imageUri}>
      <Stack direction="row" justify="flex-end">
        <Button variant="ghost" size="sm" onClick={() => withdraw(tokenId)}>
          Withdraw
        </Button>
      </Stack>
    </BaseNftCard>
  );
};

export default VaultNftCard;
