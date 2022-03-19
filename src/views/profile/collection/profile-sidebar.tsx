import React from 'react';
import { Flex, Stack, Text, IconButton, RadioGroup, Radio, Divider } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import type { LayerNetwork } from '~/modules/types';

interface ISidebarProfile {
  network: LayerNetwork;
  setNetwork: React.Dispatch<React.SetStateAction<LayerNetwork>>;
}

export const SidebarProfile: React.VFC<ISidebarProfile> = ({ network, setNetwork }) => {
  return (
    <Flex flexDir="column" w="250px" px="20px" py="10px" borderRightWidth="1px" gap="4">
      <Flex flexDir="row" align="center" justify="space-between">
        <Text fontSize="2xl">Filter</Text>
        <IconButton
          variant="ghost"
          icon={<ChevronLeftIcon boxSize="20px" />}
          aria-label="sidebar-toggle"
          borderWidth="1px"
          borderRadius="full"
        />
      </Flex>
      <Divider />
      <Flex flexDir="column" gap="4">
        <Text>Layer</Text>
        <RadioGroup value={network} onChange={(val: LayerNetwork) => setNetwork(val)}>
          <Stack direction="column">
            <Radio value="ethereum">Ethereum</Radio>
            <Radio value="starknet">Starknet</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
    </Flex>
  );
};

export default SidebarProfile;
