import React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Route, Switch, BrowserRouter } from 'react-router-dom' // React Router v4
import 'typeface-roboto' // Roboto font for material-ui

import Wrapper from './components/Wrapper'
import SongList from './components/SongList'
import SongCreate from './components/SongCreate'
import SongDetails from './components/SongDetails'
import Signup from './components/Signup'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

// Configure apollo to send cookies with every request
const link = new HttpLink({
  credentials: 'same-origin'
})

// Configure the apollo client to use the link above and default cache
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

// Yay for declarative programming
const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Wrapper>
          <Route exact path="/" component={SongList} />
          <Switch>
            <ProtectedRoute
              privateRoute
              path="/songs/new"
              component={SongCreate}
            />
            <ProtectedRoute
              privateRoute
              path="/songs/:id"
              component={SongDetails}
            />
          </Switch>
          <ProtectedRoute publicRoute path="/login" component={Login} />
          <ProtectedRoute publicRoute path="/signup" component={Signup} />
        </Wrapper>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
