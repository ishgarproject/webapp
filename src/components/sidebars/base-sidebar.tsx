import React from 'react';
import { Flex, Text, IconButton, Divider } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export const BaseSidebar: React.FC = ({ children }) => {
  return (
    <Flex flexDir="column" w="250px" px="20px" py="10px" borderRightWidth="1px" gap="4">
      <Flex flexDir="row" align="center" justify="space-between">
        <Text fontSize="2xl">Filter</Text>
        <IconButton
          variant="ghost"
          icon={<ChevronLeftIcon boxSize="20px" />}
          aria-label="sidebar-toggle"
          borderWidth="1px"
          borderRadius="full"
        />
      </Flex>
      <Divider />
      <Flex flexDir="column" gap="4">
        {children}
      </Flex>
    </Flex>
  );
};

export default BaseSidebar;
