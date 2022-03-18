import React from 'react';
import { Stack, Text, TypographyProps } from '@chakra-ui/react';
import { EthereumLogo } from './ethereum-logo';
import type { Size } from '~/modules/types';

interface IStat {
  label: string;
  value?: string | null;
  size?: Size;
  isEther?: boolean;
}

const etherValue: Record<Size, TypographyProps['fontSize']> = {
  sm: 'md',
  lg: '3xl',
};

export const Stat: React.FC<IStat> = ({ label, value, size, isEther }) => {
  return (
    <Stack direction="column" align="flex-start" spacing="1">
      <Text fontSize={size} pl="2%" color="gray.300">
        {label}
      </Text>
      <Stack direction="row" align="center">
        {isEther && <EthereumLogo size={size} />}
        <Text fontSize={etherValue[size || 'sm']} fontWeight={isEther ? 'bold' : 'normal'}>
          {value || '---'}
        </Text>
      </Stack>
    </Stack>
  );
};

Stat.defaultProps = {
  size: 'sm',
  isEther: false,
};

export default Stat;
