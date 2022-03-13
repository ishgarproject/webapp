import React from 'react';
import { Stack, Text, Icon } from '@chakra-ui/react';
import EthereumLogo from './ethereum-logo';

export const SimpleStat: React.FC<{ label: string; num: string }> = ({ label, num }) => {
  return (
    <Stack direction="column" align="flex-start">
      <Text fontSize="sm" color="gray.300">
        {label}
      </Text>
      <Stack direction="row">
        <Icon as={EthereumLogo} />
        <Text fontWeight="bold">{num}</Text>
      </Stack>
    </Stack>
  );
};

export default SimpleStat;
