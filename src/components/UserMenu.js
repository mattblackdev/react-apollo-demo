import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Menu, { MenuItem } from 'material-ui/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'

import logoutMutation from '../mutations/logout'
import currentUserQuery from '../queries/currentUser'

class UserMenu extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    displayText: PropTypes.string.isRequired
  }
  state = {
    anchorEl: null,
    open: false
  }
  render() {
    return (
      <Fragment>
        <Typography>{this.props.displayText}</Typography>
        <IconButton
          onClick={e =>
            this.setState({ anchorEl: e.currentTarget, open: true })
          }
          color="contrast"
          ref={ref => (this.anchorEl = ref)}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          onRequestClose={() => this.setState({ anchorEl: null, open: false })}
        >
          <MenuItem onClick={this.props.logout}>Logout</MenuItem>
        </Menu>
      </Fragment>
    )
  }
}

export default graphql(logoutMutation, {
  options: {
    update: (store, response) => {
      store.writeQuery({
        query: currentUserQuery,
        data: { user: null }
      })
    }
  },
  props: ({ mutate }) => ({
    logout: mutate
  })
})(UserMenu)
