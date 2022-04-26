import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { VStack, Stack, Button, Text, Select, Image } from '@chakra-ui/react';
import { useERC721 } from '~/modules/hooks/use-contract';
import { Head } from '~/components';
import { MOCK_ERC721S } from '~/constants';

const Mint: NextPage = () => {
  const [selectedERC721, setSelectedERC721] = useState(MOCK_ERC721S.CloneX.address);
  const [tokenURI, setTokenURI] = useState('');
  const { contract, mint } = useERC721(selectedERC721);

  useEffect(() => {
    async function getTotalTokens() {
      const totalTokens = await contract?.totalTokens();
      const erc721 = Object.values(MOCK_ERC721S).find(({ address }) => address === selectedERC721);
      const tokenUri = `${erc721?.tokenUri}/${totalTokens}.png`;
      if (totalTokens !== undefined) {
        setTokenURI(tokenUri);
      }
    }
    getTotalTokens();
  }, [contract]);

  return (
    <>
      <Head />
      <VStack px="10%" pt="1%" justify="center" spacing="4">
        <Text fontSize="lg" textAlign="center">
          Mint some NFTs to try out the platform!
        </Text>
        <Stack w="20%" spacing="4">
          <Select defaultValue={selectedERC721} onChange={(e) => setSelectedERC721(e.target.value)}>
            {Object.entries(MOCK_ERC721S).map(([name, { address }]) => (
              <option key={name} value={address}>
                {name}
              </option>
            ))}
          </Select>
          <Image src={tokenURI} alt="tokenURI" />
          <Button variant="outline" colorScheme="blue" onClick={mint}>
            Mint
          </Button>
        </Stack>
      </VStack>
    </>
  );
};

export default Mint;
