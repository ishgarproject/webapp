import { z } from 'zod';
import { createRouter } from '~/server/create-router';

export const accountsRouter = createRouter().query('.nfts', {
  input: z.object({
    address: z.string().nonempty('accounts: address must not be empty').optional(),
  }),
  async resolve({ ctx, input }) {
    const provider = ctx.web3Provider;
    const { address } = input;
    if (!address) {
      return [];
    }
  },
});
