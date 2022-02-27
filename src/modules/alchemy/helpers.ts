import type { GetNftMetadataResponse } from '@alch/alchemy-web3';
import { OwnedERC721s } from '~/modules/types';

export function reduceByContractAddress(nfts: GetNftMetadataResponse[]) {
  return nfts.reduce<OwnedERC721s>((result, { contract, id, metadata }) => {
    const { address } = contract;
    const nft = {
      tokenId: Number(id.tokenId),
      gateway: metadata?.image,
    };
    if (!result[address]) {
      return {
        ...result,
        [address]: {
          address,
          nfts: [nft],
        },
      };
    }
    result[address].nfts.push(nft);
    return result;
  }, {});
}
