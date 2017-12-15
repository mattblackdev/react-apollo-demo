import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'

import BackButton from './BackButton'
import query from '../queries/currentUser'

class UserForm extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    updateWith: PropTypes.string.isRequired
  }
  state = {
    email: '',
    password: '',
    errors: []
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { email, password } = this.state
    const { mutate, updateWith } = this.props
    mutate({
      variables: { email, password },
      update: (store, { data }) => {
        store.writeQuery({
          query,
          data: { user: data[updateWith] }
        })
      }
    }).catch(e =>
      this.setState({
        errors: e.graphQLErrors.map(error => error.message)
      })
    )
  }

  render() {
    const { title } = this.props
    const { errors } = this.state
    return (
      <React.Fragment>
        <BackButton />
        <Paper style={{ padding: 24 }}>
          <form onSubmit={this.handleSubmit}>
            <Typography type="display1" style={{ display: 'inline-block' }}>
              {title}
            </Typography>

            {errors &&
              errors.map((error, i) => (
                <Typography color="error" key={i} style={{ float: 'right' }}>
                  {error}
                </Typography>
              ))}
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              onChange={e =>
                this.setState({ errors: [], email: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              onChange={e =>
                this.setState({ errors: [], password: e.target.value })
              }
            />
            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <Button raised color="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </React.Fragment>
    )
  }
}

export default UserForm
