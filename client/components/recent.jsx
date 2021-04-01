import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { grabUserRecentlyPlayedSpotify } from '../redux/actions/userActions';

class RecentlyPlayed extends React.Component {
  constructor() {
    super();
    this.grabSpotifyData = this.grabSpotifyData.bind(this);
    this.checkForDuplicates = this.checkForDuplicates.bind(this);
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

  checkForDuplicates() {
    let favorites = [];
    let tracks = [];
    let topTracks = [];
    let artits = [];
    let topArtits = [];

    if (this.props.mostPlayedTracks.items && this.props.recentTracks.items) {
      for (let i = 0; i < this.props.recentTracks.items.length; i++) {
        tracks.push(this.props.recentTracks.items[i].track.name);
        artits.push(this.props.recentTracks.items[i].track.artists[0].name)
      }
      for (let v = 0; v < this.props.mostPlayedTracks.items.length; v++) {
        tracks.push(this.props.mostPlayedTracks.items[v].name);
        artits.push(this.props.mostPlayedTracks.items[v].artists[0].name)
      }
      for (let i = 0; i < artits.length; i++) {
        let count = 0;
        for (let v = 0; v < artits.length; v++) {
          if (artits[v] == artits[i]) {
            count++;
          }
        }
        if (count >= 2) {
          topArtits.push({
            item: artits[i],
            count: count
          })
        }
      }
      console.log(tracks)
      for (let i = 0; i < tracks.length; i++) {
        let count = 0;
        for (let v = 0; v < tracks.length; v++) {
          if (tracks[v] == tracks[i]) {
            count++;
          }
        }
        if (count >= 2) {
          topTracks.push({
            item: tracks[i],
            count: count
          })
        }
      }
      // for (let i = 0; i < artits.length; i++) {
      //   let count = 0;
      //   for (let v = 0; v < artits.length; v++) {
      //     if (artits[v] == artits[i]) {
      //       count++;
      //     }
      //   }
      //   if (count >= 3) {
      //     topArtits.push({
      //       item: this.props.recentTracks.items[i],
      //       count: count
      //     })
      //     count = 0;
      //   }
      // }
      console.log(topTracks);
      console.log(topArtits);
    }

  }

  render() {
    let tracks;
    if (this.props.recentTracks.items) {
      tracks = this.props.recentTracks.items;
      this.checkForDuplicates();
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
  token: PropTypes.object.isRequired,
  recentTracks: PropTypes.object.isRequired,
  mostPlayedTracks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.users.tokenData,
  recentTracks: state.users.recentlyPlayedTracks,
  mostPlayedTracks: state.users.mostPlayedTracks
});

export default connect(mapStateToProps, { grabUserRecentlyPlayedSpotify })(RecentlyPlayed);
