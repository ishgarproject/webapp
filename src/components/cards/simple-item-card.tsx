import React from 'react';
import { Stack, Image, Text } from '@chakra-ui/react';

interface ISimpleItemCard {
  label: string;
  imageUri: string | null;
}

export const SimpleItemCard: React.FC<ISimpleItemCard> = ({ label, imageUri }) => {
  return (
    <Stack direction="row" align="center">
      <Image w="10" src={imageUri ?? undefined} alt={`${label}-logo`} borderRadius="full" />
      <Text fontWeight="bold">{label}</Text>
    </Stack>
  );
};

export default SimpleItemCard;
