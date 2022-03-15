import React from 'react';
import { Stack, Text, Switch } from '@chakra-ui/react';
import { BaseSidebar } from './base-sidebar';

export const MarketplaceSidebar: React.FC<{ buyNow: boolean; switchBuyNow: () => void }> = ({
  buyNow,
  switchBuyNow,
}) => {
  return (
    <BaseSidebar>
      <Stack direction="row" justify="space-between">
        <Text>Buy now</Text>
        <Switch checked={buyNow} onChange={switchBuyNow} />
      </Stack>
    </BaseSidebar>
  );
};

export default MarketplaceSidebar;
