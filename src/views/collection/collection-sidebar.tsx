import React from 'react';
import { BaseSidebar } from '~/components/sidebars/base-sidebar';

interface ICollectionSidebar {
  buyNow: boolean;
  switchBuyNow: () => void;
}

export const CollectionSidebar: React.FC<ICollectionSidebar> = ({ buyNow, switchBuyNow }) => {
  return <BaseSidebar></BaseSidebar>;
};

export default CollectionSidebar;
