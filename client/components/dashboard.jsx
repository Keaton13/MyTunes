import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authorizeUserSpotify, saveSpotifyUserToken } from '../redux/actions/userActions';
import Header from './header';

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            spotify: {
                authorization: false,
                token: null
            }
        }
        this.connectToSpotify = this.connectToSpotify.bind(this);
        this.saveSpotifyTokenFunction = this.saveSpotifyTokenFunction.bind(this);
    }

    connectToSpotify() {
        this.props.authorizeUserSpotify();
    }

    saveSpotifyTokenFunction(token) {
        this.props.saveSpotifyUserToken(token).then(() => {
            this.setState({
                spotify: {
                    authorization: true,
                    token: token
                }
            })
        })
    }

    render() {
        let auth = this.state.spotify.authorization
        if (window.location.href.length >= 32) {
            let accessToken = window.location.href.split('=')
            console.log(accessToken);
            let token = accessToken[1] + "=" + accessToken[2] + "=" + accessToken[3]
            console.log(token)
            this.saveSpotifyTokenFunction(token)
        }
        return (
            <div>
                <Header />
                <div className="container min-vw-95">
                    <div className="row background-color-4">
                        <div className="col-8 sign-up-row-height text-center font-2">
                            <div className="mt-3">
                                <h3 className="">Most Played</h3>
                            </div>
                        </div>
                        <div className="col-4 sign-up-row-height text-center font-2">
                            <div className="mt-3">
                                <h3 className="">Recently Played</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row min-vw-95 min-height-dashboard">
                        <div className="col-8 mt-3 background-color-4">
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
                                <div>
                                    <h1>Test</h1>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-4">

                    </div>
                </div>
            </div>
        )
    }
}


Dashboard.propTypes = {
    authorizeUserSpotify: PropTypes.func.isRequired,
    saveSpotifyUserToken: PropTypes.func.isRequired
}

const mapStateToProps = state => ({

});


export default connect(mapStateToProps, { authorizeUserSpotify, saveSpotifyUserToken })(Dashboard)