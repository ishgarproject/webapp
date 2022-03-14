import React from 'react';
import { Stack, Text, Icon } from '@chakra-ui/react';
import EthereumLogo from './ethereum-logo';

export const SimpleStat: React.FC<{ label: string; num: string; isEther?: boolean }> = ({ label, num, isEther }) => {
  return (
    <Stack direction="column" align="flex-start">
      <Text fontSize="sm" color="gray.300">
        {label}
      </Text>
      <Stack direction="row" align="center">
        {isEther && <Icon as={EthereumLogo} />}
        <Text fontWeight={isEther ? 'bold' : 'normal'}>{num}</Text>
      </Stack>
    </Stack>
  );
};

SimpleStat.defaultProps = {
  isEther: false,
};

export default SimpleStat;
