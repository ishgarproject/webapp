import { Flex, Text } from '@chakra-ui/react';

export const CollectionBanner: React.FC<{ name?: string }> = ({ name, children }) => {
  return (
    <Flex flexDir="column" h="80px" justifyContent="center" px="20px" borderBottomWidth="1px">
      <Text fontSize="2xl" fontWeight="bold">
        {name}
      </Text>
      <Flex flexDir="row" gap="4">
        {children}
      </Flex>
    </Flex>
  );
};

export default CollectionBanner;
