import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';

interface INavButton {
  label: string;
  path: string;
}

export const NavButton: React.FC<INavButton> = ({ label, path }) => {
  const { pathname } = useRouter();
  const isActive = pathname === path;
  return (
    <Button
      as="a"
      href={path}
      variant="ghost"
      borderBottomWidth="4px"
      borderBottomColor={isActive ? '#2081e2' : 'transparent'}
    >
      {label}
    </Button>
  );
};

export default NavButton;
