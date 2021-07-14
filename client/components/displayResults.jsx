import React from 'react';
import YouTubePlayer from './youtubePlayer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleYouTubeSearch } from '../redux/actions/youtubeActions';
import {
  removeSpotifyTrack,
  checkIfSpotifyTrackIsLiked,
  saveSpotifyTrack,
  grabUsersSpotifyPlaylists,
  saveTrackToSpotifyPlaylist
} from '../redux/actions/spotifyActions';

class DisplayResults extends React.Component {
  constructor() {
    super();
    this.handleRecommendedClick = this.handleRecommendedClick.bind(this);
    this.state = {
      name: null,
      artist: null,
      pic: null,
      id: null
    };
    this.handlePlaylistClick = this.handlePlaylistClick.bind(this);
  }

  componentDidMount() {
    this.props.grabUsersSpotifyPlaylists(this.props.token, this.props.spotifyUsername);
  }

  handleRecommendedClick(song) {
    this.setState({
      name: song.name,
      artist: song.artists[0].name,
      pic: song.album.images[0].url,
      id: song.id
    }, () => {
      this.props.handleYouTubeSearch(song.name, song.artists[0].name);
    });
  }

  handlePlaylistClick(playlistId) {
    this.props.saveTrackToSpotifyPlaylist(this.props.token, playlistId, this.state.id);
  }

  render() {
    const recommendedSongs = this.props.spotifyRecommended.tracks;

    return (
      <div className='container background-color-2 h-100'>
        <div className='row mt-4'>
          <h3 className='w-100 text-center font-2'>Select Favorite</h3>
          <h3 className='w-100 text-center font-2'>Songs</h3>
        </div>
        <div className='col background-color-4'>
          <div className='row mb-4 mt-2 discoverRow'>
            {recommendedSongs.map(song => {
              return (
                <div
                  className='col-2 mt-3 mr-3 ml-3 background-color-2 min-width-40'
                  key={song.id}
                  onClick={() => {
                    this.handleRecommendedClick(song);
                  }}
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  <div className='row mt-3'>
                    <div className='col text-center'>
                      <img
                        src={song.album.images[0].url}
                        className='select-genre-image-class'
                      ></img>
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <h5 className='text-center w-100 font-4'>{song.name}</h5>
                    <h5 className="text-center w-100 recommendedSongDisplay">By</h5>
                    <h5 className='text-center w-100 font-4'>{song.artists[0].name}</h5>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='row'>
            {/* {this.props.genreStatus.status === true && (
                  <button
                    type='button'
                    onClick={this.filterGenreSelectionForApi}
                    className='btn font-2 buttonbackground btn-lg btn-block headerBackground w-25 mx-auto mb-4'
                  >
                    Submit
                  </button>
                )} */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-custom" role="document">
                <div className="modal-content youtubeModalWidth">
                  <div className="modal-header">
                    {/* <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {/* <img
                      src={this.state.pic}
                      className='select-track-image-class'
                    ></img> */}
                    {this.state.name !== null && (
                      <YouTubePlayer name={this.state.name} artist={this.state.artist} id={this.state.id} />
                    )}
                  </div>
                  <div className="modal-footer">
                    <div className="container">
                      <div className="row modal-width-mobile m-auto">
                        <div className="col">
                          <i className="fas fa-plus plusCustom" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                          {this.props.spotifyLikedStatus === true ? <i className="fas fa-heart heartCustom mr-5" onClick={this.props.removeSpotifyTrack.bind(this, this.props.token, this.state.id)}></i> : <i className="far fa-heart heartCustom mr-5" onClick={this.props.saveSpotifyTrack.bind(this, this.props.token, this.state.id)}></i>}
                          <div className="dropdown-menu customDropDown overflow-auto">
                            {this.props.spotifyUserPlaylists !== null && this.props.spotifyUserPlaylists.map(playlist => {
                              return <a className="dropdown-item" key={playlist.id} onClick={() => { this.handlePlaylistClick(playlist.id); }} href="#" data-toggle="modal" data-target="#playlistModal">{playlist.name}</a>;
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="row modal-width-mobile m-auto pt-2">
                        <div className="col p-0">
                          <h5>{'Track: ' + this.state.name}</h5>
                        </div>
                      </div>
                      <div className="row modal-width-mobile m-auto pb-3">
                        <div className="col p-0">
                          <h5>{'Artist: ' + this.state.artist}</h5>
                        </div>
                      </div>
                      <div className="row">
                        <button type="button" className="btn btn-secondary m-auto" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal fade" id="playlistModal" tabIndex="-1" role="dialog" aria-labelledby="playlistModal" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body text-center">
                    {this.props.spotifyAddToPlaylistStatus === true ? <h3>Song Added to playlist!</h3> : <h3>We had an error adding the song :/</h3>}
                  </div>
                  <div className="modal-footer">
                    <div className="row w-100">
                      <div className="col text-center">
                        <button type="button" className="btn btn-secondary text-center" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
DisplayResults.propTypes = {
  handleYouTubeSearch: PropTypes.func.isRequired,
  saveSpotifyTrack: PropTypes.func.isRequired,
  removeSpotifyTrack: PropTypes.func.isRequired,
  grabUsersSpotifyPlaylists: PropTypes.func.isRequired,
  saveTrackToSpotifyPlaylist: PropTypes.func.isRequired,
  spotifyRecommended: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  spotifyUsername: PropTypes.string.isRequired,
  spotifyAddToPlaylistStatus: PropTypes.bool
};

const mapStateToProps = state => ({
  spotifyRecommended: state.spotifyData.spotifyRecommended,
  spotifyLikedStatus: state.spotifyData.spotifyLikedStatus,
  token: state.spotifyData.tokenData.token,
  spotifyUserPlaylists: state.spotifyData.spotifyUserPlaylists,
  spotifyUsername: state.spotifyData.spotifyUserProfile,
  spotifyAddToPlaylistStatus: state.spotifyData.spotifyAddToPlaylistStatus

});

export default connect(mapStateToProps, {
  handleYouTubeSearch,
  removeSpotifyTrack,
  checkIfSpotifyTrackIsLiked,
  saveSpotifyTrack,
  grabUsersSpotifyPlaylists,
  saveTrackToSpotifyPlaylist
})(DisplayResults);
