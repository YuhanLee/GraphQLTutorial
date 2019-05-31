import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// required dependencies from installed packages
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import * as serviceWorker from './serviceWorker';

import App from './components/App'

import './styles/index.css'

//connects to ApolloClient instance with GraphQL API, GraphQL server will be running on port 4000
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

//instantiate ApollocClient by passing in httplink
const client = new ApolloClient({
  link: httpLink,
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
