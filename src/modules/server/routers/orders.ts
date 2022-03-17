import { z } from 'zod';
import { createRouter } from '~/server/create-router';
import { OrderType } from '@prisma/client';

export const ordersRouter = createRouter()
  .query('all-orders', {
    async resolve({ ctx }) {
      const { prisma } = ctx;
      return prisma.order.findMany({});
    },
  })
  .mutation('create-bid', {
    input: z.object({
      tokenDatabaseId: z.number().nonnegative('orders: token database id must not be negative'),
      valueInEther: z.number().nonnegative('orders: offer value must be positive').gte(0),
    }),
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { tokenDatabaseId, valueInEther } = input;
      // TODO: check if user has enough funds
      const res = await prisma.order.create({
        data: {
          value: valueInEther,
          orderType: OrderType.BID,
          tokenId: tokenDatabaseId,
        },
      });
      console.log('create-bid', res);
    },
  });
