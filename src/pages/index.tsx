import type { NextPage } from 'next';
import Link from 'next/link';
import { Stack, Text, Table, Tbody, Tr, Td, Divider } from '@chakra-ui/react';
import { Head, SimpleItemCard, SimpleStat } from '~/components';
import trpc from '~/modules/trpc';

const Home: NextPage = () => {
  const { data: collections } = trpc.useQuery(['vault.collections']);
  console.log('collections', collections);
  return (
    <>
      <Head />
      <Stack direction="column" px="13%" pt="2%" spacing="5">
        <Text fontSize="4xl">Collections</Text>
        <Text fontSize="xl">The top NFT collections on Ishgar</Text>
        <Divider />
        <Table backgroundColor="#21262A">
          <Tbody>
            {collections?.map(({ id, name, address, imageUri, floor, totalTokensAvailable }, index) => (
              <Link key={id} href={`/collection/${address}`} passHref>
                <Tr _hover={{ backgroundColor: 'rgba(255, 255, 255, 0.16)', cursor: 'pointer' }}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <SimpleItemCard label={name} imageUri={imageUri} />
                  </Td>
                  <Td isNumeric>
                    <SimpleStat label="Available" value={`${totalTokensAvailable} Items`} />
                  </Td>
                  <Td isNumeric>
                    <SimpleStat label="Floor" value={floor?.toString()} isEther />
                  </Td>
                  <Td isNumeric>
                    <SimpleStat label="Total Vol" value={null} isEther />
                  </Td>
                  <Td isNumeric>
                    <SimpleStat label="24h Vol" value={null} isEther />
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
