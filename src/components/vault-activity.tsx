import React from 'react';
import { Stack, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import ItemCard from './item-card';
import { NFT } from '~/lib/types';

const truncateMiddleString = (s: string) => {
  if (!s) {
    return s;
  }
  return `${s.slice(0, 6)}...${s.slice(s.length - 6, s.length)}`;
};

export const VaultActivity: React.FC<{ title: string; data?: NFT[] }> = ({ title, data }) => {
  return (
    <Stack direction="column">
      <Text fontSize="xl" fontWeight="bold">
        {title}
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Item</Th>
            <Th>From</Th>
            <Th>Transaction</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map(({ owner, tokenId, tokenUri }, index) => (
            <Tr key={index}>
              <Td>
                <ItemCard tokenId={tokenId} tokenUri={tokenUri} />
              </Td>
              <Td>{truncateMiddleString(owner)}</Td>
              <Td>{truncateMiddleString('0x1234')}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default VaultActivity;
