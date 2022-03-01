import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

export const Loader: React.FC = () => (
  <Box w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
    <Spinner />
  </Box>
);

export default Loader;
