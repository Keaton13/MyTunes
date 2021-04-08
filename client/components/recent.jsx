import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { grabUserRecentlyPlayedSpotify } from '../redux/actions/spotifyActions';

class RecentlyPlayed extends React.Component {
  constructor() {
    super();
    this.grabSpotifyData = this.grabSpotifyData.bind(this);
    this.checkForDuplicates = this.checkForDuplicates.bind(this);
    this.getTopSongAndArtist = this.getTopSongAndArtist.bind(this);
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

  checkForDuplicates() {
    // const favorites = [];
    const tracks = [];
    const topTracks = [];
    const artits = [];
    const topArtits = [];
    // console.log(this.props.mostPlayedTracks.items);
    // console.log(this.props.recentTracks);
    if (this.props.mostPlayedTracks.items && this.props.recentTracks.items) {
      for (let i = 0; i < this.props.recentTracks.items.length; i++) {
        tracks.push(this.props.recentTracks.items[i].track.id);
        artits.push(this.props.recentTracks.items[i].track.artists[0].id);
      }
      for (let v = 0; v < this.props.mostPlayedTracks.items.length; v++) {
        tracks.push(this.props.mostPlayedTracks.items[v].id);
        artits.push(this.props.mostPlayedTracks.items[v].artists[0].id);
      }
      tracks.sort();
      artits.sort();
      // console.log(tracks)
      // console.log(artits)
      for (let i = 0; i < artits.length - 1; i++) {
        let count = 0;
        const duplicates = [];
        for (let v = 0; v < artits.length - 1; v++) {
          if (artits[v] === artits[i]) {
            count++;
            if (i !== v) {
              duplicates.push(v);
            }
          }
        }
        for (let g = duplicates.length - 1; g >= 0; g--) {
          artits.splice(duplicates[g], 1);
        }
        if (count >= 2) {
          topArtits.push({
            item: artits[i],
            count: count
          });
        }
      }

      for (let i = 0; i < tracks.length - 1; i++) {
        let count = 0;
        const duplicates = [];
        for (let v = 0; v < tracks.length - 1; v++) {
          if (tracks[v] === tracks[i]) {
            count++;
            if (i !== v) {
              duplicates.push(v);
            }
          }
        }
        for (let g = duplicates.length - 1; g >= 0; g--) {
          tracks.splice(duplicates[g], 1);
        }
        if (count >= 2) {
          topTracks.push({
            item: tracks[i],
            count: count
          });
        }
      }
      this.getTopSongAndArtist(topTracks, topArtits);
    }

  }

  getTopSongAndArtist(topTracks, topArtits) {
    const trackMax = [{ item: '', count: 0 }, { item: '', count: 0 }, { item: '', count: 0 }, { item: '', count: 0 }, { item: '', count: 0 }];
    const artistMax = [{ item: '', count: 0 }, { item: '', count: 0 }, { item: '', count: 0 }, { item: '', count: 0 }, { item: '', count: 0 }];
    for (let i = 0; i < topTracks.length; i++) {
      if (topTracks[i].count > trackMax[0].count) {
        trackMax[0] = topTracks[i];
      } else if (topTracks[i].count > trackMax[1].count) {
        trackMax[1] = topTracks[i];
      } else if (topTracks[i].count > trackMax[2].count) {
        trackMax[2] = topTracks[i];
      } else if (topTracks[i].count > trackMax[3].count) {
        trackMax[3] = topTracks[i];
      } else if (topTracks[i].count > trackMax[4].count) {
        trackMax[4] = topTracks[i];
      }
    }

    for (let i = 0; i < topArtits.length; i++) {
      if (topArtits[i].count > artistMax[0].count) {
        artistMax[0] = topArtits[i];
      } else if (topArtits[i].count > artistMax[1].count) {
        artistMax[1] = topArtits[i];
      } else if (topArtits[i].count > artistMax[2].count) {
        artistMax[2] = topArtits[i];
      } else if (topArtits[i].count > artistMax[3].count) {
        artistMax[3] = topArtits[i];
      } else if (topArtits[i].count > artistMax[4].count) {
        artistMax[4] = topArtits[i];
      }
    }
    // console.log(trackMax);
    // console.log(artistMax);
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
  token: state.spotifyData.tokenData,
  recentTracks: state.spotifyData.recentlyPlayedTracks,
  mostPlayedTracks: state.spotifyData.mostPlayedTracks
});

export default connect(mapStateToProps, { grabUserRecentlyPlayedSpotify })(RecentlyPlayed);
