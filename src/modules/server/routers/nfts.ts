import { z } from 'zod';
import { createRouter } from '~/server/create-router';

export const nftsRouter = createRouter()
  .query('', {
    async resolve({ ctx }) {
      return await ctx.prisma.nft.findMany();
    },
  })
  .query('.nft', {
    input: z.object({
      id: z.number().nonnegative('nft: id must not be negative'),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      return await ctx.prisma.nft.findFirst({ where: { id } });
    },
  });
