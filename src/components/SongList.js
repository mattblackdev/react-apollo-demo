import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Grid from 'material-ui/Grid'
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import Paper from 'material-ui/Paper'

import query from '../queries/fetchSongs'

class SongList extends Component {
  handleSongDelete = id => {
    const { mutate, data } = this.props
    mutate({ variables: { id } }).then(() => data.refetch())
  }
  renderSongs() {
    const { data: { songs }, history } = this.props
    return songs.map(({ id, title }) => (
      <ListItem key={id} button onClick={() => history.push(`/songs/${id}`)}>
        <ListItemText primary={title} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={e => {
              e.stopPropagation()
              this.handleSongDelete(id)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
  }
  render() {
    const { loading } = this.props.data
    if (loading) {
      return <div>Loading...</div>
    }
    return (
      <Paper style={{ padding: 24 }}>
        <Grid container justify="space-between" style={{ marginBottom: 24 }}>
          <Grid item>
            <Typography type="display1">Songs</Typography>
          </Grid>
          <Grid item>
            <Button
              fab
              color="primary"
              aria-label="add"
              onClick={() => this.props.history.push('/songs/new')}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <List style={{ marginBottom: 24 }}>{this.renderSongs()}</List>
      </Paper>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default graphql(mutation)(graphql(query)(SongList))
