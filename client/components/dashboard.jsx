import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authorizeUserSpotify, saveSpotifyUserToken } from '../redux/actions/userActions';
import MostPlayed from './mostPlayed';
import Recent from './recent';
import Discord from './discover';
import Header from './header';
import Discover from './discover';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.connectToSpotify = this.connectToSpotify.bind(this);
  }

  componentDidMount() {
    this.connectToSpotify();
  }

  connectToSpotify() {
    const auth = this.props.auth.status;
    if (auth == false) {
      this.props.authorizeUserSpotify();
    }
  }

  render() {
    const auth = this.props.auth.status;
    console.log(auth);
    return (
      <div>
        <Header />
        <div className="container min-vw-95">

          <div className="row min-vw-95 min-height-dashboard">
            <div className="col-9 background-color-4">
              {/* <div className="row h-25 m-auto" >
                                <div className="col my-auto">
                                    <h3 className="text-center">Connect Accounts</h3>
                                </div>
                            </div> */}
              {auth == false &&
                <div className="row h-100 w-50 m-auto ">
                  <div className="col my-auto">
                    <h3 className="text-center">
                      Connect To
                                    </h3>
                    <button type="button" onClick={this.connectToSpotify} className="btn btn-success btn-lg btn-block w-75 mx-auto mt-4">Spotify</button>
                  </div>
                  <div className="col my-auto">
                    <h3 className="text-center">
                      Connect To
                                    </h3>
                    <button type="button" className="btn btn-warning btn-lg btn-block w-75 mx-auto mt-4">SoundCloud</button>
                  </div>
                </div>
              }
              {auth === true &&
                <div className="row">
                  <MostPlayed />
                  <Discover />
                </div>
              }
            </div>
            {auth === true &&
              <Recent />
            }
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  authorizeUserSpotify: PropTypes.func.isRequired,
  saveSpotifyUserToken: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.users.tokenData,
  auth: state.users.auth
});

export default connect(mapStateToProps, { authorizeUserSpotify, saveSpotifyUserToken })(Dashboard);
