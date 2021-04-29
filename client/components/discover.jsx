import React from 'react';
import SelectGenre from './select-genre';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Discover extends React.Component {
  render() {
    if(this.props.mostPlayedTracks.items && this.props.recentTracks.items) {
      try {
        // this.checkForTrackAndArtistDuplicates();
      } catch (error) {
        console.err(error);
      }
      let check = new Promise((resolve, reject) => {
          // this.checkForTrackAndArtistDuplicates();
          resolve('success!')
      }).then(result => {
          //this.checkForArtistAndTrackDuplicates();
      })
    }
    return (
      <div className="col-8">
        <div className="row background-color-2">
          <h3 className="w-100 text-center font-2 mt-3 mb-3">Discover</h3>
        </div>
        <div className="row">
          <div className="col ml-2 mr-2 background-color-4">
            <SelectGenre />
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
  mostPlayedTracks: state.spotifyData.mostPlayedTracks
});

export default connect(mapStateToProps)(Discover);
