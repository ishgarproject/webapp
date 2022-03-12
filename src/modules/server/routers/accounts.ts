import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createRouter } from '~/server/create-router';
import { isAddress } from '~/modules/utils/web3';

const inputSchema = z.object({ address: z.string().nonempty('accounts: address must not be empty').optional() });

export const accountsRouter = createRouter()
  .middleware(({ ctx, rawInput, next }) => {
    const input = inputSchema.safeParse(rawInput);
    if (!input.success) throw new TRPCError({ code: 'BAD_REQUEST' });
    const { address } = input.data;
    // address is defined on client-side when the wallet is connected so first render is undefined
    if (!address) return next({ ctx });
    if (!isAddress(address)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'address must be an address',
      });
    }

    return next({ ctx });
  })
  .query('.nfts', {
    input: inputSchema,
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { address } = input;
      if (!address) return [];
      return prisma.contract.findMany({
        where: {
          tokens: {
            some: {
              owner: address,
            },
          },
        },
        include: {
          tokens: {
            where: {
              owner: address,
            },
          },
        },
      });
    },
  })
  .query('.deposited', {
    input: inputSchema,
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { address } = input;
      if (!address) return [];
      return prisma.token.findMany({ where: { depositedInVault: true, depositorAddress: address } });
    },
  });
