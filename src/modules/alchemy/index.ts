import ky from 'ky';
import { GetNftMetadataResponse } from '@alch/alchemy-web3';
import { ALCHEMY_BASE_URIS, ALCHEMY_API_KEY } from '~/constants';
import { ALCHEMY_METHODS } from './methods';

type AlchemyNetwork = 'mainnet' | 'goerli';

interface GetNftsWithMetadataResponse {
  ownedNfts: GetNftMetadataResponse[];
  totalCount: number;
  blockHash: string;
}

export class AlchemyClient {
  readonly api: typeof ky;
  readonly baseUrl: string;

  constructor(network: AlchemyNetwork) {
    this.baseUrl = this.getUrl(network);
    this.api = ky.create({ prefixUrl: this.baseUrl });
  }

  async getNfts(owner: string): Promise<GetNftsWithMetadataResponse> {
    const nfts = await this.api.get(ALCHEMY_METHODS.GET_NFTS, {
      searchParams: {
        owner,
        withMetadata: true,
      },
    });
    return nfts.json();
  }

  getUrl(network: AlchemyNetwork) {
    let host = null;
    switch (network) {
      case 'mainnet':
        host = ALCHEMY_BASE_URIS.mainnet;
        break;
      case 'goerli':
        host = ALCHEMY_BASE_URIS.goerli;
        break;
    }
    return host + ALCHEMY_API_KEY;
  }
}
