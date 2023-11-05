import { Main } from '@/components/commons'
import { client } from '@/config/gql'
import { font } from '@/config/theme'
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
      <Main
        className={`${font.className}`}
      >
        <Component {...pageProps} />
      </Main>
    </PersistGate>
  </ApolloProvider>
  </Provider>
}
