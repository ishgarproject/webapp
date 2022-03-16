import { z } from 'zod';
import { createRouter } from '~/server/create-router';
import { OrderType, OrderStatus } from '@prisma/client';

export const vaultRouter = createRouter()
  .query('collection', {
    input: z.object({
      address: z.string().nonempty('accounts: address must not be empty').optional(),
      buyNow: z.boolean(),
    }),
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { address, buyNow } = input;
      const collection = await prisma.contract.findUnique({
        where: { address },
        select: {
          id: true,
          address: true,
          name: true,
          tokens: {
            where: buyNow
              ? {
                  depositedInVault: true,
                  orders: { some: { orderType: OrderType.ASK, orderStatus: OrderStatus.OPEN } },
                }
              : { depositedInVault: true },
            select: {
              id: true,
              tokenId: true,
              imageUri: true,
              orders: {
                take: 1,
                where: {
                  orderType: OrderType.ASK,
                  orderStatus: OrderStatus.OPEN,
                },
                orderBy: { value: 'desc' },
              },
            },
          },
        },
      });

      if (!collection) return;
      const totalTokensAvailable = await prisma.token.count({
        where: {
          AND: [{ contract: address }, { depositedInVault: true }],
        },
      });
      // make highestAsk more accessible for frontend
      const tokens = collection.tokens.map(({ orders, ...rest }) => ({
        ...rest,
        // only one open ask taken
        highestAsk: orders[0]?.value || null,
      }));
      // collection floor
      const { _min: floor } = await prisma.order.aggregate({
        where: {
          orderType: OrderType.ASK,
          orderStatus: OrderStatus.OPEN,
          Token: { contract: address },
        },
        _min: { value: true },
      });
      const stats = {
        floor: floor.value,
        totalVolume: null, // TODO
        totalTokensAvailable,
      };
      return { ...collection, stats, tokens };
    },
  })
  .query('collections', {
    async resolve({ ctx }) {
      const { prisma } = ctx;
      const collections = await prisma.contract.findMany({
        where: { tokens: { some: { depositedInVault: true } } },
        select: {
          id: true,
          name: true,
          address: true,
          tokens: {
            where: { depositedInVault: true },
            select: {
              imageUri: true,
              orders: {
                where: { orderType: OrderType.ASK, orderStatus: OrderStatus.OPEN },
                orderBy: { value: 'asc' },
                take: 1,
              },
            },
          },
        },
      });
      return collections.map(({ tokens, ...rest }) => {
        // TODO: find a cleaner way to get floor per collection directly from prisma
        const floor = tokens?.reduce((min, { orders }) => (orders[0]?.value < min ? orders[0].value : min), 0);
        return {
          ...rest,
          floor: floor || null,
          imageUri: tokens[0].imageUri, // should replace it with a logo
          totalTokensAvailable: tokens.length.toString(), // should replace it by a proper `_count`
        };
      });
    },
  });
