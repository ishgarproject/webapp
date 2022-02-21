import React from 'react';
import { VStack, Stack, Box, Button, Text, Image } from '@chakra-ui/react';
import { useIshgar, useMockERC721 } from '~/lib/hooks/use-contract';
import { ISHGAR_VAULT_ADDRESS, MOCK_ERC721_ADDRESS } from '~/lib/constants';
import { NFT } from '~/lib/types';

export const NFTCard: React.FC<NFT> = ({ tokenId, tokenUri, approvedAddress, deposited }) => {
  const ishgar = useIshgar(true);
  const mockERC721 = useMockERC721(true);

  const approve = async () => {
    try {
      const tx = await mockERC721?.approve(ISHGAR_VAULT_ADDRESS, tokenId);
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  };

  const deposit = async () => {
    try {
      const tx = await ishgar?.depositNFT(MOCK_ERC721_ADDRESS, tokenId);
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  };

  const isApproved = approvedAddress === ISHGAR_VAULT_ADDRESS.toLowerCase();
  return (
    <VStack w="220px" bg="#FAFAFA" p="5" borderRadius="10">
      <Stack direction="column">
        <Text fontWeight="bold">Bored Ape Yatch Club</Text>
        <Image src={tokenUri} alt="nft-img" />
        <Box>
          <Text>#{tokenId}</Text>
        </Box>
        <Stack direction="row" justify="flex-end">
          <Button hidden={isApproved} variant="ghost" size="sm" onClick={approve}>
            Approve
          </Button>
          <Button variant="ghost" size="sm" onClick={deposit}>
            {deposited ? 'Withdraw' : 'Deposit'}
          </Button>
        </Stack>
      </Stack>
    </VStack>
  );
};

export default NFTCard;
