import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Flex, Button, Text, Image, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useWeb3 } from '~/modules/hooks/use-web3';
import { Attributes } from '~/views/collection/attributes';
import { Offers } from '~/views/collection/offers';
import { Stat } from '~/components';
import trpc from '~/modules/trpc';

export const NftPage: NextPage = () => {
  const {
    query: { collectionAddress, tokenId },
  } = useRouter();
  const { address } = useWeb3();
  const { data: nft } = trpc.useQuery([
    'vault.nft',
    { collectionAddress: collectionAddress as string, tokenId: +(tokenId as string) },
  ]);
  console.log('nft', nft);
  return (
    <Flex flexDir="row" minH="91vh" px="18%" py="1%">
      <Flex flexDir="column" w="40%" gap={4}>
        <Image src={nft?.imageUri || ''} alt="nft-img" />
        {nft?.attributes && <Attributes attributes={nft.attributes} />}
      </Flex>
      <Flex flexDir="column" flex="1" px="2%" gap="4">
        <Flex flexDir="row" align="center" gap="4">
          <IconButton
            variant="ghost"
            icon={<ArrowBackIcon boxSize="20px" />}
            aria-label="back-page"
            borderRadius="full"
          />
          <Text fontSize="lg" color="blue.500">
            {nft?.name}
          </Text>
        </Flex>
        <Text fontWeight="bold" fontSize="2xl">
          {nft?.collectionName}
        </Text>
        <Text>Owned by {nft?.owner}</Text>
        <Flex flexDir="column" pt="2%" pb="3%" bg="#303339" borderRadius="lg" gap="2">
          <Stat isEther label="Current price" value={nft?.lowestAsk?.toString()} size="lg" />
          <Flex flexDir="row" pl="2%" gap="4">
            {address === nft?.owner ? (
              <>
                <Button colorScheme="blue">Buy now</Button>
                <Button>Make offer</Button>
              </>
            ) : (
              <Button colorScheme="blue">Sell</Button>
            )}
          </Flex>
        </Flex>
        <Offers offers={nft?.orders} />
      </Flex>
    </Flex>
  );
};

export default NftPage;
