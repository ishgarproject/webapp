import React from 'react';
import type { Order } from '@prisma/client';
import {
  Flex,
  Text,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

type Offer = Pick<Order, 'id' | 'creator' | 'value'>;

export const Offers: React.FC<{ offers?: Offer[] }> = ({ offers }) => {
  return (
    <Accordion allowMultiple px="0">
      <AccordionItem borderWidth="1px" py="3px" pb="0" borderRadius="lg">
        <AccordionButton justifyContent="space-between">
          <Flex flexDir="row" align="center" gap="2">
            <Icon as={HamburgerIcon} boxSize="20px" />
            <Text fontSize="lg">Offers</Text>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel px="0" pb="0">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Price</Th>
                <Th>USD Price</Th>
                <Th>From</Th>
              </Tr>
            </Thead>
            <Tbody>
              {offers?.map(({ id, creator, value }) => (
                <Tr key={id}>
                  <Td>{value} eth</Td>
                  <Td>$3000</Td>
                  <Td>{creator}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Offers;
