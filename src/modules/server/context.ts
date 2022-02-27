import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { AlchemyClient } from '~/modules/alchemy';
import { web3Provider } from './web3-provider';
import { prisma } from './db';

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const alchemy = new AlchemyClient('goerli');
  return {
    req,
    res,
    prisma,
    alchemy,
    web3Provider,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
