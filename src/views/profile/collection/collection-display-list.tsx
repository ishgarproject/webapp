import React from 'react';
import type { Token } from '@prisma/client';
import type { LayerNetwork } from '~/modules/types';
import { Stack, Grid, GridItem, Button } from '@chakra-ui/react';
import { useIshgar, useERC721 } from '~/modules/hooks/use-contract';
import { BaseNftCard } from '~/components';
import { ISHGAR_VAULT_ADDRESS } from '~/constants';

interface IBaseCollectionDisplay {
  collectionAddress?: string;
  tokens?: Token[];
}

interface ICollectionDisplayList extends IBaseCollectionDisplay {
  layerNetwork: LayerNetwork;
}

export const CollectionDisplayList: React.FC<ICollectionDisplayList> = ({ layerNetwork, ...rest }) => {
  return layerNetwork === 'ethereum' ? <EthereumNftList {...rest} /> : <StarknetNftList {...rest} />;
};

export default CollectionDisplayList;

const EthereumNftList: React.FC<IBaseCollectionDisplay> = ({ collectionAddress, tokens }) => {
  const { depositNft } = useIshgar();
  const { approve } = useERC721(collectionAddress!);
  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={6}>
      {tokens?.map(({ tokenId, imageUri, contract, approvedAddress }) => {
        const hasApproved = approvedAddress?.toLowerCase() === ISHGAR_VAULT_ADDRESS.toLowerCase();
        return (
          <GridItem key={tokenId}>
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
          </GridItem>
        );
      })}
    </Grid>
  );
};

const StarknetNftList: React.FC<IBaseCollectionDisplay> = ({ tokens }) => {
  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={6}>
      {tokens?.map(({ tokenId, imageUri }) => {
        return (
          <GridItem key={tokenId}>
            <BaseNftCard tokenId={tokenId} imageUri={imageUri}>
              <Stack direction="row" justify="flex-end">
                <Button variant="ghost" size="sm" onClick={async () => console.log('TODO')}>
                  Withdraw
                </Button>
              </Stack>
            </BaseNftCard>
          </GridItem>
        );
      })}
    </Grid>
  );
};
