import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Typography from 'material-ui/Typography'
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import Badge from 'material-ui/Badge'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import ThumbUpIcon from 'material-ui-icons/ThumbUp'
import { withStyles } from 'material-ui/styles'

import fetchSong from '../queries/fetchSong'
import BackButton from './BackButton'
import LyricCreate from './LyricCreate'

const LikesBadge = withStyles({
  badge: {
    width: 18,
    height: 18
  }
})(({ likes, classes, highest }) => {
  const color = highest ? 'accent' : 'primary'
  return likes > 0 ? (
    <Badge classes={classes} badgeContent={likes} color={color}>
      <ThumbUpIcon />
    </Badge>
  ) : (
    <ThumbUpIcon />
  )
})

class SongDetails extends Component {
  handleLike = (id, likes) => {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }

  renderLyrics = () => {
    const { lyrics } = this.props.data.song
    const highestLikes =
      lyrics.length > 0
        ? lyrics.map(lyric => lyric.likes).reduce((a, b) => (a < b ? b : a))
        : 0

    return lyrics.map(({ id, content, likes }) => (
      <ListItem key={id}>
        <ListItemText primary={content} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => this.handleLike(id, likes)}>
            <LikesBadge likes={likes} highest={likes >= highestLikes} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
  }

  render() {
    const { song } = this.props.data
    if (!song) return <div />

    return (
      <Fragment>
        <BackButton />
        <Paper style={{ padding: 24, marginBottom: 24 }}>
          <Typography type="display1">{song.title}</Typography>
          <LyricCreate
            songId={song.id}
            onAddLyric={result => console.log(result)}
          />
          <List>{this.renderLyrics()}</List>
        </Paper>
      </Fragment>
    )
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

export default graphql(mutation)(
  graphql(fetchSong, {
    options: props => ({ variables: { id: props.match.params.id } })
  })(SongDetails)
)
