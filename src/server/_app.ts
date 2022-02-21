import superjson from 'superjson';
import { createRouter } from './create-router';
import { nftsRouter } from './routers/nfts';
import { mintsRouter } from './routers/mints';

export const appRouter = createRouter().transformer(superjson).merge('nfts', nftsRouter).merge('mints', mintsRouter);

export type AppRouter = typeof appRouter;
