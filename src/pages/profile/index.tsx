import type { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { useWeb3Context } from '~/modules/context/web3-context';
import { Collection } from '~/components';
import ProfileView from '~/components/layouts/profile';
import trpc from '~/modules/trpc';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const Profile: NextPageWithLayout = () => {
  const { address } = useWeb3Context();
  const { data } = trpc.useQuery(['account.nfts', { address }]);
  console.log('data', data);
  return (
    <Box px="4%">
      {data?.map((collection) => (
        <Collection key={collection.address} {...collection} />
      ))}
    </Box>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <ProfileView>{page}</ProfileView>;
};

export default Profile;
