import React from 'react';
import { Flex, Text, Switch, Divider } from '@chakra-ui/react';
import { AttributeFilters } from '~/views/collection';
import { BaseSidebar } from '~/components/sidebars/base-sidebar';

const SidebarSectionTitle: React.FC = ({ children }) => (
  <Text fontSize="sm" textTransform="uppercase">
    {children}
  </Text>
);

interface ICollectionSidebar {
  buyNow: boolean;
  switchBuyNow: () => void;
}

export const CollectionSidebar: React.FC<ICollectionSidebar> = ({ buyNow, switchBuyNow }) => {
  return (
    <BaseSidebar>
      <Flex flexDir="row" justify="space-between">
        <SidebarSectionTitle>Buy Now</SidebarSectionTitle>
        <Switch checked={buyNow} onChange={switchBuyNow} />
      </Flex>
      <Divider />
      <SidebarSectionTitle>Properties</SidebarSectionTitle>
      <AttributeFilters />
    </BaseSidebar>
  );
};

export default CollectionSidebar;
