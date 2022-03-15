import React from 'react';
import { Stack, Text, Radio, RadioGroup } from '@chakra-ui/react';
import { BaseSidebar } from './base-sidebar';
import type { LayerNetwork } from '~/modules/types';

interface IProfileSidebar {
  layerNetwork: LayerNetwork;
  setLayerNetwork: React.Dispatch<React.SetStateAction<'ethereum' | 'starknet'>>;
}

export const ProfileSidebar: React.FC<IProfileSidebar> = ({ layerNetwork, setLayerNetwork }) => {
  const handleLayerNetworkChange = (network: LayerNetwork) => {
    setLayerNetwork(network);
  };
  return (
    <BaseSidebar>
      <Text>Networks</Text>
      <RadioGroup value={layerNetwork} onChange={handleLayerNetworkChange}>
        <Stack direction="column">
          <Radio value="ethereum">Ethereum</Radio>
          <Radio value="starknet">Starknet</Radio>
        </Stack>
      </RadioGroup>
    </BaseSidebar>
  );
};

export default ProfileSidebar;
