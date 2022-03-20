import { z } from 'zod';
import { createRouter } from '~/server/create-router';
import { OrderType, OrderStatus } from '@prisma/client';
import { truncateMiddleOfAddress, getFirstCharactersOfHash } from '~/modules/helpers';

export const vaultRouter = createRouter()
  .query('nft', {
    input: z.object({
      collectionAddress: z.string().nonempty('vault: address must not be empty'),
      tokenId: z
        .number()
        .nonnegative('vault: tokenId must be positive')
        .int('vault: databaseTokenId must be an integer'),
    }),
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { collectionAddress, tokenId } = input;
      const nft = await prisma.token.findFirst({
        where: { collectionAddress, tokenId: tokenId.toString() },
        select: {
          id: true,
          tokenId: true,
          imageUri: true,
          owner: true,
          collectionAddress: true,
          Contract: { select: { name: true } },
          orders: {
            where: { orderType: OrderType.ASK, orderStatus: OrderStatus.OPEN },
            select: { id: true, value: true },
            orderBy: { value: 'desc' },
            take: 1,
          },
        },
      });

      if (!nft) return null;

      const { id, tokenId: tokenIdStr, imageUri, owner, orders, Contract } = nft;

      return {
        id,
        tokenId: tokenIdStr,
        imageUri,
        owner: getFirstCharactersOfHash(owner),
        highestAsk: orders[0]?.value || null,
        collectionAddress,
        collectionName: Contract?.name,
      };
    },
  })
  .query('collection', {
    input: z.object({
      address: z.string().nonempty('vault: address must not be empty').optional(),
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
              name: true,
              tokenId: true,
              imageUri: true,
              owner: true,
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
          AND: [{ collectionAddress: address }, { depositedInVault: true }],
        },
      });
      // make highestAsk more accessible for frontend
      const tokens = collection.tokens.map(({ orders, owner, ...rest }) => ({
        ...rest,
        owner: {
          full: owner,
          truncated: truncateMiddleOfAddress(owner),
        },
        highestAsk: orders[0]?.value || null, // only one open ask taken
      }));
      // collection floor
      const { _min: floor } = await prisma.order.aggregate({
        where: {
          orderType: OrderType.ASK,
          orderStatus: OrderStatus.OPEN,
          Token: { collectionAddress: address },
        },
        _min: { value: true },
      });
      const stats = {
        floor: floor.value,
        totalVolume: null, // TODO
        totalTokensAvailable,
      };
      return {
        ...collection,
        address: {
          full: collection.address,
          truncated: truncateMiddleOfAddress(collection.address),
        },
        stats,
        tokens,
      };
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
