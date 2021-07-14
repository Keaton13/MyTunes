import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RecentlyPlayed extends React.Component {
  render() {
    return (
      <div className="col-8 background-color-4 min-width-375 m-auto">
        <div className="row">
          <h3 className="text-center mt-3 mb-3 w-100 font-2">Recent</h3>
        </div>
        <div className="row col-5-customCss">
          {this.props.recentTracks.items.map(track => {
            return (
              <div className="row mt-1 mb-1 background-color-2 w-100" key={track.track.id}>
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
  }
}

RecentlyPlayed.propTypes = {
  token: PropTypes.object.isRequired,
  recentTracks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.spotifyData.tokenData,
  recentTracks: state.spotifyData.recentlyPlayedTracks
});

export default connect(mapStateToProps, { })(RecentlyPlayed);
