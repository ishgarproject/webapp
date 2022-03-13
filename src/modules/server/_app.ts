import superjson from 'superjson';
import { createRouter } from './create-router';
import { accountsRouter } from './routers/accounts';
import { vaultRouter } from './routers/vault';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('account.', accountsRouter)
  .merge('vault.', vaultRouter);

export type AppRouter = typeof appRouter;
