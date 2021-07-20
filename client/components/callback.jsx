import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveSpotifyUserToken } from '../redux/actions/spotifyActions';

class Callback extends React.Component {
  componentDidMount() {
    if (window.location.href.length >= 32) {
      const accessToken = window.location.href.split('=');
      const token = accessToken[1] + '=' + accessToken[2] + '=' + accessToken[3];
      this.props.saveSpotifyUserToken(token);
    }
  }

  render() {
    if (this.props.token.token) {
      return <Redirect to='/dashboard' />;
    }
    console.log('this is callback.js')
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }
}

Callback.propTypes = {
  saveSpotifyUserToken: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.spotifyData.tokenData
});

export default connect(mapStateToProps, { saveSpotifyUserToken })(Callback);
