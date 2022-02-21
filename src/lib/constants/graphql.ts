import { gql } from '@apollo/client';

export const GRAPHQL_URI = 'https://api.thegraph.com/subgraphs/name/krouspy/ishgarsandbox';

export const QUERY_NFTS = gql`
  {
    nfts {
      id
      owner
      tokenId
      tokenUri
      deposited
      approvedAddress
    }
  }
`;

export const QUERY_NFTS_BY_OWNER = gql`
  query ($owner: Bytes) {
    nfts(where: { owner: $owner }) {
      id
      owner
      tokenId
      tokenUri
      deposited
      approvedAddress
    }
  }
`;

export const QUERY_NFTS_DEPOSITED = gql`
  {
    nfts(where: { deposited: true }) {
      id
      owner
      tokenId
      tokenUri
      deposited
      approvedAddress
    }
  }
`;
