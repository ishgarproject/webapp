import React from 'react';
import { Stack, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const OrderType: React.FC<{ isAsk: boolean }> = ({ isAsk }) => {
  return (
    <Text as="mark" bg={isAsk ? '#90dbf4' : '#ffba08'} px="3" py="1" borderRadius="90">
      {isAsk ? 'Ask' : 'Bid'}
    </Text>
  );
};

export const OrdersActivity: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Stack direction="column">
      <Text fontSize="xl" fontWeight="bold">
        {title}
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Item</Th>
            <Th>Price</Th>
            <Th>From</Th>
            <Th>Transaction</Th>
          </Tr>
        </Thead>
        <Tbody>
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <Tr key={id}>
              <Td>
                <OrderType isAsk={id % 2 === 0} />
              </Td>
              <Td>Hehe</Td>
              <Td>10 ETH</Td>
              <Td>0x1234</Td>
              <Td>0x4321</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default OrdersActivity;
