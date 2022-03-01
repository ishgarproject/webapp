import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import Navbar from './navbar';
import Sidebar from './sidebar';

export const Layout: React.FC = ({ children }) => {
  return (
    <Box h="100vh" w="100vw" minH="100vh" maxW="100vw" overflowX="hidden">
      <Navbar />
      <Stack direction="row">
        <Sidebar />
        <Box minH="94vh" pt="6vh" pl="260px">
          {children}
        </Box>
      </Stack>
    </Box>
  );
};

export default Layout;
