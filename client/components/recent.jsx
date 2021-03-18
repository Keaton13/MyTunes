import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { grabUserRecentlyPlayedSpotify } from '../redux/actions/userActions';

class RecentlyPlayed extends React.Component {
  constructor() {
    super();
    this.grabSpotifyData = this.grabSpotifyData.bind(this);
  }

  componentDidMount() {
    console.log('test');
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
    if (this.props.recentTracks.items) {
      tracks = this.props.recentTracks.items;
      return (
        <div className="col-4 background-color-4 mt-3">
          <div className="row col-5-customCss">
            {tracks.map(track => {
              return (
                <div className="row mt-1 mb-1 background-color-2 w-100">
                  <div className="col-2">
                    <img src={track.track.album.images[0].url} className="mw-100"></img>
                  </div>
                  <div className="col-10">
                    <div className="row mt-2">
                      <h5 className="mt-2">Title:</h5>
                      <h5 className="ml-3 mt-2">{track.track.name}</h5>
                    </div>
                    <div className="row">
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
  token: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.users.tokenData,
  recentTracks: state.users.recentlyPlayedTracks
});

export default connect(mapStateToProps, { grabUserRecentlyPlayedSpotify })(RecentlyPlayed);
