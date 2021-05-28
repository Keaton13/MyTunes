import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { grabUserMostPlayedSpotify } from '../redux/actions/spotifyActions';

class MostPlayed extends React.Component {
  constructor() {
    super();
    this.grabSpotifyData = this.grabSpotifyData.bind(this);
  }

  componentDidMount() {
    this.grabSpotifyData();
  }

  grabSpotifyData() {
    if (this.props.token) {
      const token = this.props.token;
      this.props.grabUserMostPlayedSpotify(token);
    }
  }

  render() {
    let tracks;
    if (this.props.topTracks.items) {
      tracks = this.props.topTracks.items;
      return (
        <div className="col-4">
          <div className="row">
            <h3 className="text-center mt-3 mb-3 w-100 font-2">Top Played</h3>
          </div>
          <div className="row col-4-customCss">
            {tracks.map(track => {
              return (
                <div className="row mt-1 mb-1 background-color-2 w-100">
                  <div className="col-4">
                    <img src={track.album.images[0].url} className="mw-100"></img>
                  </div>
                  <div className="col-8">
                    <div className="row mt-3">
                      <h5 className="mt-2">Title:</h5>
                      <h5 className="ml-3 mt-1">{track.name}</h5>
                    </div>
                    <div className="row">
                      <h5 className="mt-2">Artist:</h5>
                      <h5 className="ml-3 mt-1">{track.artists[0].name}</h5>
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
          <h3>Loading...</h3>
        </div>
      );
    }
  }
}

MostPlayed.propTypes = {
  grabUserMostPlayedSpotify: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  topTracks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.spotifyData.tokenData.token,
  topTracks: state.spotifyData.mostPlayedTracks
});

export default connect(mapStateToProps, { grabUserMostPlayedSpotify })(MostPlayed);
