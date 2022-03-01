import { BigNumber } from '@ethersproject/bignumber';
import type { GetNftMetadataResponse } from '@alch/alchemy-web3';
import type { OwnedERC721s, Nft } from '~/modules/types';
import { IPFS_BASE_URI } from '~/constants';

export function reduceByContractAddress(nfts: GetNftMetadataResponse[]) {
  return nfts.reduce<OwnedERC721s>((result, { contract, id, metadata }) => {
    const { address } = contract;
    const tokenUri = getIpfsUri(metadata?.image);
    const tokenId = BigNumber.from(id.tokenId).toNumber();
    const tokenIdWithLeadingZeros = getTokenIdWithLeadingZeros(id.tokenId);
    const nft: Nft = {
      tokenId,
      tokenIdWithLeadingZeros,
      tokenUri,
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

function getTokenIdWithLeadingZeros(tokenIdHex: string) {
  const tokenIdStr = BigNumber.from(tokenIdHex).toString();
  const totalDigits = tokenIdStr.length;
  // arbitrary 10k totalSupply - should query totalSupply
  const zerosToAdd = 4 - totalDigits;
  const prefix = new Array(zerosToAdd).fill('0').join('');
  return prefix + tokenIdStr;
}

function getIpfsUri(uri: string | undefined) {
  if (!uri) {
    return;
  }
  const cid = uri.split('//')[1];
  return IPFS_BASE_URI + cid;
}
