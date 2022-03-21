import type { RawAttribute } from '~/modules/types';
import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';

export const Attribute: React.FC<RawAttribute> = ({ trait_type, value }) => {
  return (
    <Flex flexDir="column" h="90px" align="flex-start" justify="center" bg="#303339" borderRadius="lg" pl="15px">
      <Text>{trait_type}</Text>
      <Text>{value}</Text>
    </Flex>
  );
};

export const Attributes: React.FC<{ attributes: RawAttribute[] }> = ({ attributes }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      {attributes.map((attribute, index) => (
        <GridItem key={index}>
          <Attribute {...attribute} />
        </GridItem>
      ))}
    </Grid>
  );
};
