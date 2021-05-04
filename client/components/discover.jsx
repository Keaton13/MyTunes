import React from 'react';
import SelectGenre from './select-genre';
import DisplayResults from './displayResults';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Discover extends React.Component {
  render() {
    // console.log(this.props.spotifyRecommendedStatus);
    return (
      <div className="col-8">
        <div className="row background-color-2">
          <h3 className="w-100 text-center font-2 mt-3 mb-3">Discover</h3>
        </div>
        <div className="row">
          <div className="col ml-2 mr-2 background-color-4">
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
  recentTracks: PropTypes.object.isRequired,
  mostPlayedTracks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recentTracks: state.spotifyData.recentlyPlayedTracks,
  mostPlayedTracks: state.spotifyData.mostPlayedTracks,
  spotifyRecommendedStatus: state.spotifyData.spotifyRecommendedStatus
});

export default connect(mapStateToProps)(Discover);
