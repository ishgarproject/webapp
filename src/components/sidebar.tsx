import React from 'react';
import { Stack, Text, IconButton, Radio, RadioGroup, Divider } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import type { LayerNetwork } from '~/modules/types';

interface ISidebar {
  layerNetwork: string;
  setLayerNetwork: React.Dispatch<React.SetStateAction<'ethereum' | 'starknet'>>;
}

export const Sidebar: React.FC<ISidebar> = ({ layerNetwork, setLayerNetwork }) => {
  const handleLayerNetworkChange = (network: LayerNetwork) => {
    setLayerNetwork(network);
  };
  return (
    <Stack direction="column" w="100%" maxW="17vw" pl="2%" pr="1%" spacing="4">
      <Stack direction="row" justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">
          Filters
        </Text>
        <IconButton variant="ghost" icon={<ChevronLeftIcon />} aria-label="filter-open-icon" />
      </Stack>
      <Divider />
      <Stack direction="column" spacing="4">
        <Text>Networks</Text>
        <RadioGroup value={layerNetwork} onChange={handleLayerNetworkChange}>
          <Stack direction="column">
            <Radio value="ethereum">Ethereum</Radio>
            <Radio value="starknet">Starknet</Radio>
          </Stack>
        </RadioGroup>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
