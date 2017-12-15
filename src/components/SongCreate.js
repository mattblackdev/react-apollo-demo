import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'

import query from '../queries/fetchSongs'
import BackButton from './BackButton'

class SongCreate extends Component {
  state = {
    title: ''
  }

  handleChange = e => {
    const { value: title } = e.target

    this.setState({
      title
    })
  }

  onSubmit = async e => {
    e.preventDefault()
    const { title } = this.state
    const { mutate, history } = this.props
    try {
      await mutate({
        variables: { title },
        refetchQueries: [{ query }]
      })
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { title } = this.state
    return (
      <div>
        <BackButton />
        <Typography type="display1">Add a song</Typography>
        <form onSubmit={this.onSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            type="text"
            value={title}
            placeholder="Wala Wala Washington"
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`

export default graphql(mutation)(SongCreate)
