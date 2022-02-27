import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '~/server/_app';

export default createReactQueryHooks<AppRouter>();
