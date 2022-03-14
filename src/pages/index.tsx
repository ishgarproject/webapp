import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Stack, Text, Table, Tbody, Tr, Td, Divider } from '@chakra-ui/react';
import { SimpleItemCard, SimpleStat } from '~/components';
import trpc from '~/modules/trpc';

const Home: NextPage = () => {
  const { data } = trpc.useQuery(['vault.collections']);
  console.log('data', data);
  return (
    <>
      <Head>
        <title>Ishgar</title>
        <meta name="description" content="Ishgar: Order book on Starknet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction="column" px="13%" pt="2%" spacing="5">
        <Text fontSize="4xl">Collections</Text>
        <Text fontSize="xl">The top NFT collections on Ishgar</Text>
        <Divider />
        <Table backgroundColor="#21262A">
          <Tbody>
            {data?.map(({ id, name, address, imageUri, totalTokensAvailable }, index) => (
              <Link key={id} href={`/collection/${address}`} passHref>
                <Tr _hover={{ backgroundColor: 'rgba(255, 255, 255, 0.16)', cursor: 'pointer' }}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <SimpleItemCard label={name} imageUri={imageUri} />
                  </Td>
                  <Td isNumeric>
                    <SimpleStat label="Available" num={`${totalTokensAvailable} Items`} />
                  </Td>
                  <Td isNumeric>
                    <SimpleStat label="Floor" num="25.4" isEther />
                  </Td>
                  <Td isNumeric>
                    <SimpleStat label="Total Vol" num="25.4" isEther />
                  </Td>
                  <Td isNumeric>
                    <SimpleStat label="24h Vol" num="25.4" isEther />
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
