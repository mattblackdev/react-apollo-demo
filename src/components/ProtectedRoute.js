import React from 'react'
import { graphql } from 'react-apollo'
import { Route, Redirect } from 'react-router-dom'

import query from '../queries/currentUser'

const ProtectedRoute = ({
  component: Component,
  data: { user, loading },
  publicRoute,
  privateRoute,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (loading) return null
      if (publicRoute && user) return <Redirect to={{ pathname: '/' }} />
      if (privateRoute && !user) return <Redirect to={{ pathname: '/login' }} />
      return <Component {...props} />
    }}
  />
)

export default graphql(query)(ProtectedRoute)
