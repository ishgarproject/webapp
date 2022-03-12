import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createRouter } from '~/server/create-router';
import { isAddress } from '~/modules/utils/web3';

export const accountsRouter = createRouter()
  .query('.nfts', {
    input: z.object({
      address: z.string().nonempty('accounts: address must not be empty').optional(),
    }),
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { address } = input;
      if (!address) {
        return [];
      }
      if (!isAddress(address)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'address must be an address',
        });
      }
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
    input: z.object({
      address: z.string().nonempty('accounts: address must not be empty').optional(),
    }),
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { address } = input;
      if (!address) {
        return [];
      }
      if (!isAddress(address)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'address must be an address',
        });
      }
      return prisma.token.findMany({ where: { depositedInVault: true, depositorAddress: address } });
    },
  });
