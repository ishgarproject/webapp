import { ReactElement } from 'react';
import type { NextPageWithLayout } from '~/pages/_app';
import { useWeb3Context } from '~/modules/context/web3-context';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import ProfileView from '~/components/layouts/profile';
import { VaultNftCard } from '~/components';
import trpc from '~/modules/trpc';

export const Deposited: NextPageWithLayout = () => {
  const { address } = useWeb3Context();
  const { data } = trpc.useQuery(['account.deposited', { address }]);
  console.log('deposited', data);
  return (
    <Box px="4%">
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {data?.map((token) => (
          <GridItem key={token.id}>
            <VaultNftCard {...token} withdraw={async () => alert('Todo')} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

Deposited.getLayout = function getLayout(page: ReactElement) {
  return <ProfileView>{page}</ProfileView>;
};

export default Deposited;
