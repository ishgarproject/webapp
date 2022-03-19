import type { NextPage } from 'next';
import Link from 'next/link';
import { Stack, Text, Table, Thead, Tbody, Tr, Th, Td, Divider } from '@chakra-ui/react';
import { Head, SimpleItemCard, Stat } from '~/components';
import trpc from '~/modules/trpc';

const Home: NextPage = () => {
  const { data: collections } = trpc.useQuery(['vault.collections']);
  console.log('collections', collections);
  return (
    <>
      <Head />
      <Stack direction="column" px="12%" pt="2%" spacing="5">
        <Text fontSize="4xl">Collections</Text>
        <Text fontSize="xl">The top NFT collections on Ishgar</Text>
        <Divider />
        <Table backgroundColor="#21262A">
          <Thead>
            <Tr>
              <Th>Collection</Th>
              <Th>Available</Th>
              <Th>Floor</Th>
              <Th>Total Vol</Th>
              <Th>24h Vol</Th>
            </Tr>
          </Thead>
          <Tbody>
            {collections?.map(({ id, name, address, imageUri, floor, totalTokensAvailable }) => (
              <Link key={id} href={`/collection/${address}`} passHref>
                <Tr _hover={{ backgroundColor: 'rgba(255, 255, 255, 0.16)', cursor: 'pointer' }}>
                  <Td>
                    <SimpleItemCard label={name} imageUri={imageUri} />
                  </Td>
                  <Td>
                    <Stat value={`${totalTokensAvailable} Items`} />
                  </Td>
                  <Td>
                    <Stat value={floor?.toString()} isEther />
                  </Td>
                  <Td>
                    <Stat value={null} isEther />
                  </Td>
                  <Td>
                    <Stat value={null} isEther />
                  </Td>
                </Tr>
              </Link>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </>
  );
};

export default Home;
