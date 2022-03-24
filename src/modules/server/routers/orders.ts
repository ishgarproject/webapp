import { z } from 'zod';
import { createRouter } from '~/server/create-router';
import { OrderType } from '@prisma/client';

export const ordersRouter = createRouter().query('all-orders', {
  async resolve({ ctx }) {
    const { prisma } = ctx;
    return prisma.order.findMany({});
  },
});
