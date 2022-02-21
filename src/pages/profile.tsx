import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Stack, Text } from '@chakra-ui/react';
import { ListNFTCard, MintModal } from '~/components';
import useWeb3 from '~/lib/hooks/use-web3';
import { useNFTsByOwner } from '~/lib/hooks/use-nfts';

const Vault: NextPage = () => {
  const { address } = useWeb3();
  const { nfts } = useNFTsByOwner(address);
  return (
    <Box>
      <Head>
        <title>Ishgar Vault</title>
        <meta name="description" content="Ishgar: Order book on Starknet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction="column" p="2%" spacing="8">
        <Stack direction="row">
          <Text fontSize="3xl" fontWeight="bold">
            Profile
          </Text>
          <MintModal />
        </Stack>
        <ListNFTCard title="In Wallet" nfts={nfts?.wallet} />
        <ListNFTCard title="In Vault" nfts={nfts?.vault} />
      </Stack>
    </Box>
  );
};

export default Vault;
