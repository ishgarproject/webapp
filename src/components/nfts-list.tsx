import React from 'react';
import { Flex, Button, Grid, GridItem } from '@chakra-ui/react';
import { BaseNftCard, type IBaseNftCard } from '~/components';

interface INftCard extends IBaseNftCard {
  approvedVault?: boolean;
  depositedInVault?: boolean;
}

interface INftsList {
  tokens?: INftCard[];
  collectionAddress?: string;
  buttonLabel: string | ((approvedVault?: boolean) => string);
  buttonAction: (tokenId: string, ...params: any) => void;
  isLink?: boolean;
}

export const NftsList: React.VFC<INftsList> = ({ tokens, collectionAddress, buttonLabel, buttonAction, isLink }) => {
  return (
    <Grid templateColumns={{ base: 'repeat(4, 1fr)', xl: 'repeat(6, 1fr)' }} gap="6" px="1.7%" py="1%" bg="#151517">
      {tokens?.map(({ approvedVault, ...rest }) => (
        <GridItem key={rest.tokenId}>
          <BaseNftCard {...rest} collectionAddress={collectionAddress} isLink={isLink}>
            <Flex flexDir="row" justify="flex-end">
              <Button variant="outline" size="sm" onClick={() => buttonAction(rest.tokenId, approvedVault)}>
                {typeof buttonLabel === 'string' ? buttonLabel : buttonLabel(approvedVault)}
              </Button>
            </Flex>
          </BaseNftCard>
        </GridItem>
      ))}
    </Grid>
  );
};

export default NftsList;
