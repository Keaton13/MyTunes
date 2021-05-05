import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // call redux to getCurrentlyPlaying
  }

  render() {
    const progressBarStyles = {
      width: (this.props.progress_ms * 100 / this.props.item.duration_ms) + '%'
    };
    const backgroundStyles = {
      backgroundImage: `url(${this.props.item.album.images[0].url
                })`
    };
    return (
      <div className="App">
        <div className="main-wrapper">
          <div className="now-playing__img">
            <img src={'props.item.album.images[0].url'} />
          </div>
          <div className="now-playing__side">
            <div className="now-playing__name">{'props.item.name'}</div>
            <div className="now-playing__artist">
              {this.props.item.artists[0].name}
            </div>
            <div className="now-playing__status">
              {this.props.is_playing ? 'Playing' : 'Paused'}
            </div>
            <div className="progress">
              <div className="progress__bar" style={progressBarStyles} />
            </div>
          </div>
          <div className="background" style={backgroundStyles} />{' '}
        </div>
      </div>
    );
  }
}

export default Player;
