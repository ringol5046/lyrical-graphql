import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../queries/fetchSongs'

class SongList extends React.Component {
  onSongDelete(id) {
    this.props.mutate({variables: { id } })
      .then(() => {this.props.data.refetch()});
  }
  renderSong() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i className='material-icons' onClick={() => this.onSongDelete(id)}>delete</i>
        </li>
      );
    });
  }
  render() {
    if(this.props.data.loading) {
      return <div>loading...</div>
    }
    return(
      <div>
        <ul className='collection'>
          {this.renderSong()}
        </ul>
        <Link
          to='/songs/new'
          className='btn-floating btn-large red right'
        >
        <i className='material-icons'>add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongs)(SongList));