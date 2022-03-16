import { NextPageWithLayout } from '~/pages/_app';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useWeb3Context } from '~/modules/context/web3-context';
import { Head, SimpleItemCard } from '~/components';
import ProfileLayout from '~/components/layouts/profile';
import Link from 'next/link';
import trpc from '~/modules/trpc';

const Profile: NextPageWithLayout = () => {
  const { address } = useWeb3Context();
  const { data } = trpc.useQuery(['account.collections', { ownerAddress: address }]);
  return (
    <>
      <Head />
      <Box px="10%">
        <Table bg="#21262a">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Collection</Th>
              <Th>Ethereum</Th>
              <Th>Starknet</Th>
              <Th>Contract address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map(({ id, address, name, imageUri, totalTokensInWallet, totalTokensInVault }, index) => (
              <Link key={id} href={`/profile/${address}`} passHref>
                <Tr _hover={{ backgroundColor: 'rgba(255, 255, 255, 0.16)', cursor: 'pointer' }}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <SimpleItemCard label={name} imageUri={imageUri} />
                  </Td>
                  <Td>{totalTokensInWallet}</Td>
                  <Td>{totalTokensInVault}</Td>
                  <Td>{address}</Td>
                </Tr>
              </Link>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

Profile.Layout = ProfileLayout;

export default Profile;
