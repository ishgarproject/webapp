import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { web3Provider } from './web3-provider';
import { prisma } from './db';

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  return {
    req,
    res,
    prisma,
    web3Provider,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
