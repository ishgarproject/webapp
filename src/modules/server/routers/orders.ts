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
      collectionAddress: z.string().nonempty('orders: collectionAddress must not be empty'),
    }),
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { tokenDatabaseId, valueInEther, collectionAddress } = input;
      // TODO: check if user has enough funds
      const res = await prisma.order.create({
        data: {
          value: valueInEther,
          orderType: OrderType.BID,
          tokenId: tokenDatabaseId,
          collectionAddress,
        },
      });
      console.log('create-bid', res);
    },
  });
