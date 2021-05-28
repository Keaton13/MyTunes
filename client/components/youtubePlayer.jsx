import React from 'react';
import Youtube from './youtube';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkIfSpotifyTrackIsLiked } from '../redux/actions/spotifyActions'

class YouTubePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: null
    };
    console.log(this.props);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount(){
  }

  // async handleSearch (name, artist) {
  //     console.log(name);
  //     console.log(artist);
  //         const response = await Youtube.get('/search', {
  //             params: {
  //                 q: name + "" + artist,
  //                 maxResults: 1
  //             }
  //         })
  //         this.setState({
  //             videos: response.data.items
  //         })
  // }

  clearState() {
    this.setState({
      videos: null
    });
  }

  render() {
    let videoSrc = null;
    if (this.props.youTubeData[0]) {
      videoSrc = `https://www.youtube.com/embed/${this.props.youTubeData[0].id.videoId}`;
      console.log(this.state);
    }
    if(this.props.token) {
      this.props.checkIfSpotifyTrackIsLiked(this.props.token, this.props.id)
    }
    return (
      <div>
        <div className='ui embed player'>
          <iframe src={videoSrc} className='iframe-custom' allowFullScreen title='Video player' />
        </div>
      </div>
    );
  }
}

YouTubePlayer.propTypes = {
  youTubeData: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  checkIfSpotifyTrackIsLiked: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  youTubeData: state.youTubeData.youtubeSearch,
  token: state.spotifyData.tokenData.token,

});

export default connect(mapStateToProps, {checkIfSpotifyTrackIsLiked})(YouTubePlayer);
