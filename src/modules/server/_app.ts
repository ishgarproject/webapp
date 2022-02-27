import superjson from 'superjson';
import { createRouter } from './create-router';
import { accountsRouter } from './routers/accounts';
import { nftsRouter } from './routers/nfts';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('account', accountsRouter)
  .merge('nfts', nftsRouter);

export type AppRouter = typeof appRouter;
