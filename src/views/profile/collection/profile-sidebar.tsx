import React from 'react';
import { Stack, Text, RadioGroup, Radio } from '@chakra-ui/react';
import { BaseSidebar } from '~/components/sidebars/base-sidebar';
import type { LayerNetwork } from '~/modules/types';

interface ISidebarProfile {
  network: LayerNetwork;
  setNetwork: React.Dispatch<React.SetStateAction<LayerNetwork>>;
}

export const SidebarProfile: React.VFC<ISidebarProfile> = ({ network, setNetwork }) => {
  return (
    <BaseSidebar>
      <Text>Layer</Text>
      <RadioGroup value={network} onChange={(val: LayerNetwork) => setNetwork(val)}>
        <Stack direction="column">
          <Radio value="ethereum">Ethereum</Radio>
          <Radio value="starknet">Starknet</Radio>
        </Stack>
      </RadioGroup>
    </BaseSidebar>
  );
};

export default SidebarProfile;
