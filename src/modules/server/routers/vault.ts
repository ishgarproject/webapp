import { z } from 'zod';
import { createRouter } from '~/server/create-router';

export const vaultRouter = createRouter()
  .query('collections', {
    async resolve({ ctx }) {
      const { prisma } = ctx;
      const collections = await prisma.contract.findMany({
        where: {
          tokens: {
            some: {
              depositedInVault: true,
            },
          },
        },
        select: {
          id: true,
          name: true,
          address: true,
          tokens: {
            where: { depositedInVault: true },
            select: { imageUri: true },
          },
        },
      });
      // add imageUri as base property then remove `tokens` array
      return collections.map(({ tokens, ...rest }) => ({
        ...rest,
        imageUri: tokens[0].imageUri,
        totalTokensAvailable: tokens.length.toString(),
      }));
    },
  })
  .query('collection', {
    input: z.object({ address: z.string().nonempty('accounts: address must not be empty').optional() }),
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { address } = input;
      return prisma.token.findMany({
        where: {
          contract: address,
          depositedInVault: true,
        },
      });
    },
  });
