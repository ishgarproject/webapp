import { useState, useEffect } from 'react';
import { useQuery, DocumentNode, TypedDocumentNode, OperationVariables } from '@apollo/client';
import { QUERY_NFTS_BY_OWNER, QUERY_NFTS_DEPOSITED, IPFS_BASE_URI } from '~/lib/constants';
import { NFT } from '~/lib/types';

export function useNFTsDeposited() {
  return useNFTs(QUERY_NFTS_DEPOSITED);
}

export function useNFTsByOwner(address?: string) {
  const [nfts, setNFTs] = useState<{ wallet: NFT[]; vault: NFT[] }>();
  const { nfts: allNFTs } = useNFTs(QUERY_NFTS_BY_OWNER, { owner: address });

  useEffect(() => {
    if (allNFTs) {
      const nftsInWallet = allNFTs.filter(({ deposited }) => !deposited);
      const nftsInVault = allNFTs.filter(({ deposited }) => deposited);
      setNFTs({ wallet: nftsInWallet, vault: nftsInVault });
    }
  }, [allNFTs]);

  return { nfts };
}

type GraphQLQuery = DocumentNode | TypedDocumentNode<any, OperationVariables>;

export function useNFTs(query: GraphQLQuery, variables?: OperationVariables) {
  const [nfts, setNFTs] = useState<NFT[]>();
  const { data } = useQuery<{ nfts: NFT[] }>(query, { variables });

  useEffect(() => {
    (async () => {
      if (data) {
        const nfts: NFT[] = [];
        const promises: Promise<{ image: string }>[] = [];

        data.nfts.forEach(({ tokenUri, ...rest }) => {
          const cid = tokenUri.split('//')[1];
          const uri = `${IPFS_BASE_URI}${cid}`;
          const request = fetch(uri).then((res) => res.json());
          nfts.push({
            tokenUri,
            ...rest,
          });
          promises.push(request);
        });

        const result = await Promise.all(promises);
        result.map(({ image }, index) => {
          const cid = image.split('//')[1];
          nfts[index].tokenUri = `${IPFS_BASE_URI}${cid}`;
        });

        console.log(nfts);
        setNFTs(nfts);
      }
    })();
  }, [data]);

  return { nfts };
}
