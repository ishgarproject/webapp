import { Stack, Box, Avatar } from '@chakra-ui/react';
import { DefaultLayout } from './default';
import { AddressField } from '~/components';

export const ProfileLayout: React.FC = ({ children }) => {
  return (
    <DefaultLayout>
      <Stack direction="column" spacing="8" zIndex="0">
        <Stack h="30vh" direction="column" spacing="0">
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
    </DefaultLayout>
  );
};

export default ProfileLayout;
