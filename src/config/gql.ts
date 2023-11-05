import { ApolloClient, InMemoryCache } from "@apollo/client";

if (!process.env.NEXT_PUBLIC_GQL_ENDPOINT) {
  throw new Error('GQL_ENDPOINT not defined');
}

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GQL_ENDPOINT,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === 'development',
});