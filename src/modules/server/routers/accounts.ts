import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createRouter } from '~/server/create-router';
import { isAddress } from '~/modules/utils/web3';
import { getAllTraitsFromTokens } from '~/modules/helpers';
import { ISHGAR_VAULT_ADDRESS } from '~/constants';

const inputSchema = z.object({ ownerAddress: z.string().nonempty('accounts: address must not be empty').optional() });

// TODO: verify collection address
// TODO: find a way to get total tokens in wallet/deposited from prisma query or wrap in Token module
export const accountsRouter = createRouter()
  .middleware(({ ctx, rawInput, next }) => {
    const input = inputSchema.safeParse(rawInput);
    if (!input.success) throw new TRPCError({ code: 'BAD_REQUEST' });
    const { ownerAddress } = input.data;
    // address is defined on client-side when the wallet is connected so first render is undefined
    if (!ownerAddress) return next({ ctx });
    if (!isAddress(ownerAddress)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'address must be an address',
      });
    }

    return next({ ctx });
  })
  .query('collections', {
    input: inputSchema,
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { ownerAddress } = input;
      if (!ownerAddress) return [];
      const collections = await prisma.contract.findMany({
        where: {
          tokens: {
            some: {
              OR: [{ owner: ownerAddress }, { depositorAddress: ownerAddress }],
            },
          },
        },
        select: {
          id: true,
          address: true,
          name: true,
          tokens: {
            where: {
              OR: [{ owner: ownerAddress }, { depositorAddress: ownerAddress }],
            },
            select: {
              imageUri: true,
              depositedInVault: true,
            },
          },
        },
      });
      return collections.map(({ tokens, ...rest }) => {
        const inWalletCounter = tokens.reduce((sum, { depositedInVault }) => (depositedInVault ? sum : sum + 1), 0);
        const inVaultCounter = tokens.reduce((sum, { depositedInVault }) => (depositedInVault ? sum + 1 : sum), 0);
        return {
          ...rest,
          imageUri: tokens[0].imageUri,
          totalTokensInWallet: inWalletCounter,
          totalTokensInVault: inVaultCounter,
        };
      });
    },
  })
  .query('collection', {
    input: z.object({
      ownerAddress: z.string().nonempty('accounts: owner address must not be empty').optional(),
      collectionAddress: z.string().nonempty('accounts: collectionAddress must not be empty').optional(),
      layerNetwork: z.enum(['ethereum', 'starknet']),
    }),
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { ownerAddress, collectionAddress, layerNetwork } = input;

      if (!ownerAddress || !collectionAddress) return;

      const onStarknet = layerNetwork === 'starknet';
      const collection = await prisma.contract.findFirst({
        where: { address: collectionAddress },
        select: {
          name: true,
          address: true,
          tokens: {
            where: { OR: [{ owner: ownerAddress }, { depositorAddress: ownerAddress }] },
            select: {
              name: true,
              tokenId: true,
              imageUri: true,
              approvedAddress: true,
              depositedInVault: true,
              attributes: true,
            },
          },
        },
      });

      if (!collection) return;

      const traits = getAllTraitsFromTokens(collection.tokens);
      // prettier-ignore
      const onL1Counter = collection.tokens.reduce((sum, { depositedInVault }) => (depositedInVault ? sum : sum + 1), 0);
      // prettier-ignore
      const onL2Counter = collection.tokens.length - onL1Counter;
      // omit `attributes` since it's not required on frontend
      const tokens = collection.tokens.flatMap(({ name, tokenId, imageUri, approvedAddress, depositedInVault }) => {
        if (depositedInVault !== onStarknet) return [];
        return [
          {
            name,
            tokenId,
            imageUri,
            approvedVault: approvedAddress?.toLowerCase() === ISHGAR_VAULT_ADDRESS.toLowerCase(),
            depositedInVault,
            collectionAddress,
          },
        ];
      });
      return {
        ...collection,
        traits,
        tokens,
        totalTokensOnL1: onL1Counter,
        totalTokensOnL2: onL2Counter,
      };
    },
  })
  .query('deposited', {
    input: inputSchema,
    async resolve({ ctx, input }) {
      const { prisma } = ctx;
      const { ownerAddress } = input;
      if (!ownerAddress) return [];
      return prisma.token.findMany({ where: { depositedInVault: true, depositorAddress: ownerAddress } });
    },
  });
