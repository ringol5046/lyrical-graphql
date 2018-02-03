import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../queries/fetchSongs'

class SongList extends React.Component {
  renderSong() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className='collection-item'>
          {song.title}
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

export default graphql(fetchSongs)(SongList);