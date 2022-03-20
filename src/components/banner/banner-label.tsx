import React from 'react';
import { Text } from '@chakra-ui/react';

export const BannerLabel: React.VFC<{ label: string; value?: number | string | null }> = ({ label, value }) => {
  return (
    <Text fontSize="sm" color="gray.500">
      {`${label}: ${value ?? '---'}`}
    </Text>
  );
};

export default BannerLabel;
