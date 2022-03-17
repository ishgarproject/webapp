import React from 'react';
import { Stack, Text, Image } from '@chakra-ui/react';

export const ModalField: React.FC<{ label: string; value?: string; imageUri?: string | null }> = ({
  label,
  value,
  imageUri,
}) => {
  return (
    <Stack direction="row" justify="space-between" align="center">
      <Text>{label}</Text>
      {imageUri ? <Image src={imageUri} alt="nft-img" boxSize="50px" /> : <Text>{value}</Text>}
    </Stack>
  );
};

export default ModalField;
