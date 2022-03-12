import React from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { Token } from '@prisma/client';
import { ISHGAR_VAULT_ADDRESS } from '~/constants';
import BaseNftCard from './base-nft-card';

interface IOwnedNftCard extends Token {
  approve: (tokenId: string) => Promise<void>;
  depositNft: (erc721Address: string, tokenId: string) => Promise<void>;
}

export const OwnedNftCard: React.FC<IOwnedNftCard> = ({
  contract,
  tokenId,
  imageUri,
  approvedAddress,
  approve,
  depositNft,
}) => {
  // TODO: handle 'hasApproved' on backend
  const hasApproved = approvedAddress?.toLowerCase() === ISHGAR_VAULT_ADDRESS.toLowerCase();
  return (
    <BaseNftCard tokenId={tokenId} imageUri={imageUri}>
      <Stack direction="row" justify="flex-end">
        <Button variant="ghost" size="sm" onClick={() => approve(tokenId)} disabled={hasApproved}>
          {hasApproved ? 'Approved' : 'Approve'}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => depositNft(contract, tokenId)}>
          Deposit
        </Button>
      </Stack>
    </BaseNftCard>
  );
};

export default OwnedNftCard;
