import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { AppRouter } from '~/server/_app';
import { Layout } from '~/components';
import { Web3ContextProvider } from '~/modules/context/web3-context';
import { TRPC_API_URL } from '~/constants';

function MyApp({ Component, pageProps }: AppProps) {
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
