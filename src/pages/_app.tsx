import { client } from '@/config/gql'
import { persistor, store } from '@/redux'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
  <ApolloProvider client={client}>
    <PersistGate loading={null} persistor={persistor}>
    <Component {...pageProps} />
    </PersistGate>
  </ApolloProvider>
  </Provider>
}
