import React from 'react';
import { Flex, Text, Avatar as ChakraAvatar } from '@chakra-ui/react';

export const Avatar: React.VFC<{ value?: string }> = ({ value }) => {
  return (
    <Flex flexDir="row" align="center" gap={4}>
      <ChakraAvatar src="/avatar-fallback.jpg" size="sm" />
      <Flex flexDir="column" justify="center">
        <Text fontSize="sm" color="gray.500">
          Owner
        </Text>
        <Text>{value || '---'}</Text>
      </Flex>
    </Flex>
  );
};

export default Avatar;
