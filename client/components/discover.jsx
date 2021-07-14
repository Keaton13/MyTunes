import React from 'react';
import SelectGenre from './select-genre';
import DisplayResults from './displayResults';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { grabUsersSpotifyProfile, grabUserRecentlyPlayedSpotify, grabUserMostPlayedSpotify } from '../redux/actions/spotifyActions';

class Discover extends React.Component {
  componentDidMount() {
    this.props.grabUsersSpotifyProfile(this.props.token);
    this.props.grabUserMostPlayedSpotify(this.props.token);
    this.props.grabUserRecentlyPlayedSpotify(this.props.token);
  }

  render() {
    // console.log(this.props.spotifyRecommendedStatus);
    return (
      <div className="col mx-auto min-width-375">
        <div className="row background-color-2">
        </div>
        <div className="row">
          <div className="col background-color-4">
            {this.props.spotifyRecommendedStatus === true &&
              <DisplayResults />
            }
            {this.props.spotifyRecommendedStatus === false &&
              <SelectGenre />
            }
          </div>
        </div>
      </div>
    );
  }
}

Discover.propTypes = {
  // recentTracks: PropTypes.object.isRequired,
  // mostPlayedTracks: PropTypes.object.isRequired
  grabUsersSpotifyProfile: PropTypes.func.isRequired,
  grabUserMostPlayedSpotify: PropTypes.func.isRequired,
  grabUserRecentlyPlayedSpotify: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // recentTracks: state.spotifyData.recentlyPlayedTracks,
  // mostPlayedTracks: state.spotifyData.mostPlayedTracks,
  token: state.spotifyData.tokenData.token,
  spotifyRecommendedStatus: state.spotifyData.spotifyRecommendedStatus
});

export default connect(mapStateToProps, { grabUsersSpotifyProfile, grabUserMostPlayedSpotify, grabUserRecentlyPlayedSpotify })(Discover);
