import { client } from '@/config/gql'
import { store } from '@/redux'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
  </Provider>
}
