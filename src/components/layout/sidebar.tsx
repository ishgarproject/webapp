import React from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { BsCardList } from 'react-icons/bs';

export const Sidebar: React.FC = () => {
  return (
    <Stack
      direction="column"
      h="94vh"
      maxH="94vh"
      w="13vw"
      mt="6vh"
      justify="flex-start"
      spacing={6}
      position="fixed"
      pt="1%"
      px="1%"
      borderRight="1px"
      borderColor="grey"
    >
      {items.map(({ id, label, href, Icon }) => (
        <Button key={id} as="a" href={href} variant="ghost" justifyContent="left" leftIcon={<Icon size="1.4em" />}>
          {label}
        </Button>
      ))}
    </Stack>
  );
};

export default Sidebar;

const items = [
  {
    id: 0,
    label: 'Order Book',
    href: '/',
    Icon: BsCardList,
  },
];
