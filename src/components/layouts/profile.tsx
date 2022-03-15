import { Stack, Box, Avatar } from '@chakra-ui/react';
import { Navbar, AddressField } from '~/components';

export const ProfileLayout: React.FC = ({ children }) => {
  return (
    <Box h="100vh" w="100vw" minH="100vh" maxW="100vw" overflowX="hidden">
      <Navbar />
      <Stack direction="column">
        <Stack h="40vh" direction="column" spacing="0">
          <Box h="60%" bg="#151b22" />
          <Stack h="40%" direction="column" justify="space-between" pb="1%">
            <Stack align="center">
              <Avatar size="2xl" mt="-16" src="/avatar-fallback.jpg" />
              <AddressField />
            </Stack>
          </Stack>
        </Stack>
        {children}
      </Stack>
    </Box>
  );
};

export default ProfileLayout;
