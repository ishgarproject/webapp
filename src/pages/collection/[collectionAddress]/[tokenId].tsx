import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Flex, Stack, Button, Text, Image } from '@chakra-ui/react';
import { Stat } from '~/components';
import trpc from '~/modules/trpc';

export const NftPage: NextPage = () => {
  const {
    query: { collectionAddress, tokenId },
  } = useRouter();
  const { data: nft } = trpc.useQuery([
    'vault.nft',
    { collectionAddress: collectionAddress as string, tokenId: +(tokenId as string) },
  ]);
  console.log('nft', nft);
  return (
    <Flex flexDir="row" minH="92vh" mt="1%" px="17%">
      <Stack direction="column" w="40%">
        <Image src={nft?.imageUri || ''} alt="nft-img" />
      </Stack>
      <Stack direction="column" w="60%" px="2%" spacing="3">
        <Text fontSize="xl" color="blue.500">
          {nft?.collectionName}
        </Text>
        <Text fontWeight="bold" fontSize="3xl">{`${nft?.collectionName} #${nft?.tokenId}`}</Text>
        <Text>
          Owned by <span style={{ color: '#3080cc' }}>{nft?.owner}</span>
        </Text>
        <Stack direction="column" pt="2%" pb="3%" bg="#303339" borderRadius="lg">
          <Stat isEther label="Current price" value={null} size="lg" />
          <Stack direction="row" pl="2%">
            <Button colorScheme="blue">Buy now</Button>
            <Button>Make offer</Button>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default NftPage;
