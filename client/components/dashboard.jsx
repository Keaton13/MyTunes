import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authorizeUserSpotify, saveSpotifyUserToken } from '../redux/actions/spotifyActions';
import { changeDashboardDisplay } from '../redux/actions/userActions';
import MostPlayed from './mostPlayed';
import Recent from './recent';
import Header from './header';
import Discover from './discover';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.connectToSpotify = this.connectToSpotify.bind(this);
  }

  componentDidMount() {
    // this.connectToSpotify();
  }

  connectToSpotify() {
    const auth = this.props.auth.status;
    if (auth === false) {
      this.props.authorizeUserSpotify();
    }
  }

  handleViewChange(view) {
    this.props.changeDashboardDisplay(view);
  }

  render() {
    const auth = this.props.auth.status;
    let display;
    if (this.props.dashboardDisplayValue.name === 'Most Played') {
      display = <MostPlayed />;
    } else if (this.props.dashboardDisplayValue.name === 'Recent') {
      display = <Recent />;
    } else {
      display = <Discover />;
    }
    return (
      <div>
        <Header />
        <div className="container min-vw-95">
          <div className="row min-vw-95 min-height-dashboard">
            <div className="col background-color-4 mx-auto">
              {this.props.auth.status === true &&
                <div className="dropdown show text-center mt-3 hidden">
                  <a className="btn btn-secondary dropdown-toggle changeViewButtonWidth" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select-Page
                  </a>

                  <div className="dropdown-menu text-center changeViewButtonWidth" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" onClick={() => this.handleViewChange('Select Genre')}>Select-Genre</a>
                    <a className="dropdown-item" onClick={() => this.handleViewChange('Most Played')}>Most Played</a>
                    <a className="dropdown-item" onClick={() => this.handleViewChange('Recent')}>Recent</a>
                  </div>
                </div>
              }
              {/* <div className="row h-25 m-auto" >
                                <div className="col my-auto">
                                    <h3 className="text-center">Connect Accounts</h3>
                                </div>
                            </div> */}
              {auth === false &&
                <div className="row h-100 w-100 m-auto ">
                  <div className="col my-auto">
                    <h3 className="text-center">
                      Connect To
                    </h3>
                    <button type="button" onClick={this.connectToSpotify} className="btn btn-success btn-lg btn-block connectSpotifyButtonWidth mx-auto mt-4">Spotify</button>
                  </div>
                </div>
              }
              {auth === true &&
                <div className="row">
                  {display}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  authorizeUserSpotify: PropTypes.func.isRequired,
  saveSpotifyUserToken: PropTypes.func.isRequired,
  changeDashboardDisplay: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.spotifyData.tokenData,
  auth: state.spotifyData.auth,
  dashboardDisplayValue: state.users.dashboardDisplayValue
});

export default connect(mapStateToProps, { authorizeUserSpotify, saveSpotifyUserToken, changeDashboardDisplay })(Dashboard);
