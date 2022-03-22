import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Flex, Stack, Button, Text, Image, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Attributes } from '~/views/collection/attributes';
import { Avatar, Stat } from '~/components';
import trpc from '~/modules/trpc';

export const NftPage: NextPage = () => {
  const {
    query: { collectionAddress, tokenId },
  } = useRouter();
  const { data: nft } = trpc.useQuery([
    'vault.nft',
    { collectionAddress: collectionAddress as string, tokenId: +(tokenId as string) },
  ]);
  return (
    <Flex flexDir="row" minH="91vh" px="10%" py="1%">
      <Flex flexDir="column" w="25%" gap={4}>
        <Image src={nft?.imageUri || ''} alt="nft-img" />
        {nft?.attributes && <Attributes attributes={nft.attributes} />}
      </Flex>
      <Flex flexDir="column" flex="1" px="2%" gap="3">
        <Flex flexDir="row" align="center" gap="4">
          <IconButton
            variant="ghost"
            icon={<ArrowBackIcon boxSize="20px" />}
            aria-label="back-page"
            borderRadius="full"
          />
          <Text fontSize="2xl" color="blue.500">
            {nft?.name}
          </Text>
        </Flex>
        <Text fontWeight="bold" fontSize="lg">
          {nft?.collectionName}
        </Text>
        <Stack direction="column" pt="2%" pb="3%" bg="#303339" borderRadius="lg">
          <Stat isEther label="Current price" value={nft?.lowestAsk?.toString()} size="lg" />
          <Stack direction="row" pl="2%">
            <Button colorScheme="blue">Buy now</Button>
            <Button>Make offer</Button>
          </Stack>
        </Stack>
        <Avatar value={nft?.owner} />
      </Flex>
    </Flex>
  );
};

export default NftPage;
