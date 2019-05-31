import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// required dependencies from installed packages
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

//authentication for apollo-client 
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constants'

import * as serviceWorker from './serviceWorker';

import App from './components/App'

import './styles/index.css'

//connects to ApolloClient instance with GraphQL API, GraphQL server will be running on port 4000
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

//since all API req are created/sent by the APolloClient instance, it must know about the user's token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

//instantiate ApollocClient by passing in httplink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// wrapping the App with BrowserRouter so that all child components of App will get access to the routing functionality 
ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  </BrowserRouter>, 
  document.getElementById('root')
)
serviceWorker.unregister();
