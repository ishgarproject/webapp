import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { AppRouter } from '~/server/_app';
import { Layout } from '~/components';
import { Web3ContextProvider } from '~/modules/context/web3-context';
import { GRAPHQL_URI, TRPC_API_URL } from '~/constants';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Web3ContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3ContextProvider>
      </ChakraProvider>
    </ApolloProvider>
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
