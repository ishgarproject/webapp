import { NextPageWithLayout } from '~/pages/_app';
import { Box } from '@chakra-ui/react';
import { useWeb3Context } from '~/modules/context/web3-context';
import { Collection } from '~/components';
import ProfileLayout from '~/components/layouts/profile';
import trpc from '~/modules/trpc';

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

Profile.Layout = ProfileLayout;

export default Profile;
