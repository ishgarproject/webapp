import React from 'react';
import { Stack, Text, IconButton, Divider } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export const BaseSidebar: React.FC = ({ children }) => {
  return (
    <Stack
      direction="column"
      w="100%"
      maxW="17vw"
      pl="2%"
      pr="1%"
      pt="1%"
      spacing="4"
      bg="#21262a"
      borderRightWidth="0.5px"
      borderRightColor="gray.700"
    >
      <Stack direction="row" justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">
          Filters
        </Text>
        <IconButton variant="ghost" icon={<ChevronLeftIcon />} aria-label="filter-open-icon" />
      </Stack>
      <Divider />
      <Stack direction="column" spacing="4">
        {children}
      </Stack>
    </Stack>
  );
};

export default BaseSidebar;
