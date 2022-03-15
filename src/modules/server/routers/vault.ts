import { z } from 'zod';
import { createRouter } from '~/server/create-router';
import type { OrderType, OrderStatus } from '@prisma/client';

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
    input: z.object({
      address: z.string().nonempty('accounts: address must not be empty').optional(),
      buyNow: z.boolean(),
    }),
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { address } = input;
      /* const res = await prisma.order.aggregate({
        where: { Token: { contract: address } },
        _min: { value: true },
        _sum: { value: true },
      });
      console.log('hwhwe', res); */
      return prisma.contract.findUnique({
        where: { address },
        select: {
          id: true,
          address: true,
          name: true,
          tokens: {
            where: { depositedInVault: true },
            select: {
              id: true,
              tokenId: true,
              imageUri: true,
              orders: {
                take: 1,
                orderBy: { value: 'desc' },
              },
            },
          },
        },
      });
    },
  });
