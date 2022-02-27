import { z } from 'zod';
import { createRouter } from '~/server/create-router';
import { reduceByContractAddress } from '~/modules/alchemy/helpers';
import { getAllERC721Names } from '~/modules/utils/web3';

export const accountsRouter = createRouter().query('.nfts', {
  input: z.object({
    address: z.string().nonempty('accounts: address must not be empty'),
  }),
  async resolve({ ctx, input }) {
    const provider = ctx.web3Provider;
    const { address } = input;
    const { ownedNfts } = await ctx.alchemy.getNfts(address);
    const nfts = reduceByContractAddress(ownedNfts);
    const addresses = Object.keys(nfts);
    const erc721Names = await getAllERC721Names(addresses, provider);
    // set erc721 names
    return Object.values(nfts).map((ownedERC721, index) => {
      ownedERC721.name = erc721Names[index];
      return ownedERC721;
    });
  },
});
