import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import TextField from 'material-ui/TextField'

class LyricCreate extends Component {
  state = {
    content: ''
  }

  handleChange = e => {
    const { value: content } = e.target
    this.setState({
      content
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { content } = this.state
    const { mutate, songId } = this.props
    try {
      await mutate({
        variables: { content, songId }
      })
      this.setState({
        content: ''
      })
    } catch (e) {
      console.log('my error', e)
    }
  }

  render() {
    const { content } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          fullWidth
          label="Add a lyric"
          type="text"
          value={content}
          placeholder="Everybody dance now!"
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`

export default graphql(mutation)(LyricCreate)
