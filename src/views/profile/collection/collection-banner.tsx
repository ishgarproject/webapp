import { Flex, Text, Divider } from '@chakra-ui/react';
import { truncateMiddleOfAddress } from '~/helpers';

interface ICollectionBanner {
  name?: string;
  address?: string;
  totalTokensOnL1?: number;
  totalTokensOnL2?: number;
}

export const CollectionBanner: React.VFC<ICollectionBanner> = ({ name, address, totalTokensOnL1, totalTokensOnL2 }) => {
  return (
    <Flex flexDir="column" h="80px" justifyContent="center" px="20px" borderBottomWidth="1px">
      <Text fontSize="2xl" fontWeight="bold">
        {name}
      </Text>
      <Flex flexDir="row" gap="4">
        <BannerLabel label={`Ethereum: ${totalTokensOnL1 || '---'} Items`} />
        <Divider orientation="vertical" />
        <BannerLabel label={`Starknet: ${totalTokensOnL2 || '---'} Items`} />
        <Divider orientation="vertical" />
        <BannerLabel label={`Collection address: ${truncateMiddleOfAddress(address)}`} />
      </Flex>
    </Flex>
  );
};

const BannerLabel: React.VFC<{ label: string }> = ({ label }) => {
  return (
    <Text fontSize="sm" color="gray.500">
      {label}
    </Text>
  );
};

export default CollectionBanner;
