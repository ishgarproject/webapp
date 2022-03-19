import React from 'react';
import { Flex, Button, Grid, GridItem } from '@chakra-ui/react';
import { BaseNftCard, type IBaseNftCard } from '~/components';
import { useIshgar, useERC721 } from '~/modules/hooks/use-contract';

interface INftCard extends IBaseNftCard {
  approvedVault: boolean;
  depositedInVault: boolean;
}

interface INftsList {
  tokens: INftCard[];
  collectionAddress: string;
}

export const NftsList: React.VFC<INftsList> = ({ tokens, collectionAddress }) => {
  const { depositNft } = useIshgar();
  const { approve } = useERC721(collectionAddress);
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6" px="1.7%" py="1%" bg="#151517">
      {tokens?.map(({ approvedVault, ...rest }) => (
        <GridItem key={rest.tokenId}>
          <BaseNftCard {...rest}>
            <Flex flexDir="row" justify="flex-end">
              <Button
                variant="outline"
                size="sm"
                onClick={
                  approvedVault ? () => depositNft(collectionAddress, rest.tokenId) : () => approve(rest.tokenId)
                }
              >
                {approvedVault ? 'Deposit' : 'Approve'}
              </Button>
            </Flex>
          </BaseNftCard>
        </GridItem>
      ))}
    </Grid>
  );
};

export default NftsList;
