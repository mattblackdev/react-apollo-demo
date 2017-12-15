import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'

import currentUser from '../queries/currentUser'
import UserMenu from './UserMenu'

const AuthButtons = withRouter(({ history }) => (
  <Fragment>
    <Button color="accent" onClick={() => history.push('/signup')}>
      Signup
    </Button>
    <Button color="contrast" onClick={() => history.push('/login')}>
      Login
    </Button>
  </Fragment>
))

const BrandButton = withRouter(({ history }) => (
  <Button type="title" color="inherit" onClick={() => history.push('/')}>
    Lyrical
  </Button>
))

class Header extends Component {
  renderButtons = user =>
    user ? <UserMenu displayText={user.email} /> : <AuthButtons />
  render() {
    const { user, loading } = this.props
    return (
      <AppBar position="static" style={{ backgroundColor: '#777' }}>
        <Toolbar>
          <span style={{ flex: 1 }}>
            <BrandButton />
          </span>
          {!loading && this.renderButtons(user)}
        </Toolbar>
      </AppBar>
    )
  }
}

export default graphql(currentUser, {
  props: ({ data: { user, loading } }) => ({ user, loading })
})(withRouter(Header))
