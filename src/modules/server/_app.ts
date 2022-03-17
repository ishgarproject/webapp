import superjson from 'superjson';
import { createRouter } from './create-router';
import { accountsRouter } from './routers/accounts';
import { vaultRouter } from './routers/vault';
import { ordersRouter } from './routers/orders';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('account.', accountsRouter)
  .merge('vault.', vaultRouter)
  .merge('order.', ordersRouter);

export type AppRouter = typeof appRouter;
