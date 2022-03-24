import React from 'react';
import { Stack, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Text, Checkbox } from '@chakra-ui/react';

interface IAttributeFilter {
  trait: string;
  values: Record<string, boolean>;
}

export const AttributeFilter: React.FC<IAttributeFilter> = ({ trait, values }) => {
  return (
    <AccordionItem my="2" borderWidth="1px" borderRadius="lg">
      <AccordionButton justifyContent="space-between">
        <Text>{trait}</Text>
        <AccordionIcon boxSize="30px" p="1" borderWidth="1px" borderRadius="full" />
      </AccordionButton>
      <AccordionPanel>
        <Stack direction="column">
          {Object.keys(values).map((value) => (
            <Checkbox key={value}>
              <Text maxW="100px" isTruncated>
                {value.toLowerCase()}
              </Text>
            </Checkbox>
          ))}
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AttributeFilter;
