import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from '../navbar';

export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Box h="100vh" w="100vw" minH="100vh" maxW="100vw" overflowX="hidden">
      <Navbar />
      <Box minH="91vh" mt="9vh" w="100%">
        {children}
      </Box>
    </Box>
  );
};

export default DefaultLayout;
