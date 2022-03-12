import '../styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { AppRouter } from '~/server/_app';
import { Web3ContextProvider } from '~/modules/context/web3-context';
import { TRPC_API_URL } from '~/constants';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ChakraProvider>
      <Web3ContextProvider>{getLayout(<Component {...pageProps} />)}</Web3ContextProvider>
    </ChakraProvider>
  );
}

export default withTRPC<AppRouter>({
  config() {
    return {
      url: TRPC_API_URL,
      transformer: superjson,
    };
  },
  ssr: true,
  responseMeta({ clientErrors }) {
    if (clientErrors.length) {
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      };
    }
    return {};
  },
})(MyApp);
