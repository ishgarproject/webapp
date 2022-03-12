import '../styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { AppRouter } from '~/server/_app';
import { Web3ContextProvider } from '~/modules/context/web3-context';
import { DefaultLayout } from '~/components/layouts/default';
import { TRPC_API_URL } from '~/constants';

export type NextPageWithLayout = NextPage & {
  Layout: React.FC;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || DefaultLayout;
  return (
    <ChakraProvider>
      <Web3ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3ContextProvider>
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
