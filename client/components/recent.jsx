import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { grabUserRecentlyPlayedSpotify, checkForDuplicates, getTopSongAndArtist } from '../redux/actions/spotifyActions';

class RecentlyPlayed extends React.Component {
  constructor() {
    super();
    this.grabSpotifyData = this.grabSpotifyData.bind(this);
  }

  componentDidMount() {
    this.grabSpotifyData();
  }

  grabSpotifyData() {
    if (this.props.token.token) {
      const token = this.props.token.token;
      this.props.grabUserRecentlyPlayedSpotify(token);
    }
  }

  render() {
    let tracks;
    if (this.props.mostPlayedTracks.items && this.props.recentTracks.items) {
      tracks = this.props.recentTracks.items;
      // this.checkForDuplicates();
      if (this.props.duplicateStatus === false) {
        this.props.checkForDuplicates(this.props.mostPlayedTracks.items, this.props.recentTracks.items);
      } else {
        this.props.getTopSongAndArtist(this.props.duplicateTracks, this.props.duplicateArtists);
        // if(this.props.saveTopSongsAndArtistsStatus == false){
        //   this.props.getTopSongAndArtists(this.props.duplicateTracks, this.props.duplicateArtits)
        // }
      }

      return (
        <div className="col-3 background-color-4">
          <div className="row">
            <h3 className="text-center mt-3 mb-3 w-100 font-2">Recent</h3>
          </div>
          <div className="row col-5-customCss">
            {tracks.map(track => {
              return (
                <div className="row mt-1 mb-1 background-color-2 w-100">
                  <div className="col-2">
                    <img src={track.track.album.images[0].url} className="mw-100 mt-3"></img>
                  </div>
                  <div className="col-10">
                    <div className="row mt-2">
                      <h5 className="mt-2">Title:</h5>
                      <h5 className="ml-3 mt-2">{track.track.name}</h5>
                    </div>
                    <div className="row mb-2">
                      <h5 className="mt-2">Artist:</h5>
                      <h5 className="ml-3 mt-2">{track.track.artists[0].name}</h5>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      );
    } else {
      return (
        <div>
          <h1>Dont have data</h1>
        </div>
      );
    }
  }
}

RecentlyPlayed.propTypes = {
  grabUserRecentlyPlayedSpotify: PropTypes.func.isRequired,
  checkForDuplicates: PropTypes.func.isRequired,
  getTopSongAndArtist: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  recentTracks: PropTypes.object.isRequired,
  mostPlayedTracks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.spotifyData.tokenData,
  recentTracks: state.spotifyData.recentlyPlayedTracks,
  mostPlayedTracks: state.spotifyData.mostPlayedTracks,
  duplicateArtists: state.spotifyData.duplicateArtists,
  duplicateTracks: state.spotifyData.duplicateTracks,
  duplicateStatus: state.spotifyData.duplicateStatus
});

export default connect(mapStateToProps, { grabUserRecentlyPlayedSpotify, checkForDuplicates, getTopSongAndArtist })(RecentlyPlayed);
