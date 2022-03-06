import superjson from 'superjson';
import { createRouter } from './create-router';
import { accountsRouter } from './routers/accounts';

export const appRouter = createRouter().transformer(superjson).merge('account', accountsRouter);

export type AppRouter = typeof appRouter;
