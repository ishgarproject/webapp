import React from 'react';
import { Stack } from '@chakra-ui/react';
import { NavButton } from '~/components';

export const Tabs: React.FC = () => {
  return (
    <Stack direction="row" justify="center">
      {tabItems.map((element) => (
        <NavButton key={element.label} {...element} />
      ))}
    </Stack>
  );
};

const tabItems = [
  {
    label: 'Owned',
    path: '/profile',
  },
  {
    label: 'Deposited',
    path: '/profile/deposited',
  },
];

export default Tabs;
