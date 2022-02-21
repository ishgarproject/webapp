import { z } from 'zod';
import { createRouter } from '../create-router';

export const mintsRouter = createRouter()
  .query('', {
    async resolve({ ctx }) {
      return await ctx.prisma.mint.findMany();
    },
  })
  .mutation('.create', {
    input: z.object({
      erc721Address: z.string(),
      transactionHash: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.mint.create({
        data: input,
      });
    },
  });
