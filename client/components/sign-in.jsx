import React from 'react';
import Header from './header';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import { Redirect } from 'react-router-dom';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
      status: {
        code: 500
      }
    };
    this.CheckUserLoginInfo = this.CheckUserLoginInfo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  CheckUserLoginInfo() {
    const data = this.state;
    this.props.fetchUsers(data);
    if (this.props.users.status == 200) {
      console.log('working');
      this.setState({
        status: {
          code: 200
        }
      })
    }
  }

  handleInputChange(e) {
    switch (e.target.name) {
      case 'username':
        this.setState({
          username: e.target.value
        });
        break;

      case 'password':
        this.setState({
          password: e.target.value
        });
        break;
    }
  }

  handleViewChange() {
    this.props.setView('sign-up');
  }

  render() {
    if (this.state.status.code == 200) {
      return <Redirect to='/dashboard' />
    } else {
      return (
        <div className="background-color-3">
          <Header />
          <div className="container background-color-2 max-width-sign-in min-height-sign-in">
            <div className="row font-2 background-color-1 sign-up-row-height">
              <div className="col text-center my-auto">
                <h2>Login</h2>
              </div>
            </div>
            <div className="row w-75 mx-auto mt-4">
              <div className="row w-100 mt-3">
                <h3 className="font-2">Username</h3>
                <div className="input-group input-group-lg">
                  <input type="text" className="form-control" value={this.state.username} onChange={e => this.handleInputChange(e)} name="username" placeholder="Username" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
                </div>
              </div>
              <div className="row w-100 mt-3">
                <h3 className="font-2">Password</h3>
                <div className="input-group input-group-lg">
                  <input type="text" className="form-control" value={this.state.password} onChange={e => this.handleInputChange(e)} name="password" placeholder="Password" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
                </div>
              </div>
              <div className="row w-100 mt-4">
                <button type="button" onClick={this.CheckUserLoginInfo} className="btn btn-primary btn-lg btn-block w-75 mx-auto">Submit</button>
              </div>
            </div>
            <div className="row w-75 mx-auto mt-4">
              <div className="row w-100">
                <div className="col">
                  <h3 className="text-center">Don't have an account?</h3>
                  <h3 className="text-center">Sign up bellow!</h3>
                </div>
              </div>
              <div className="row w-100 mt-5">
                <div className="col">
                  <button type="button" onClick={this.handleViewChange} className="btn btn-outline-primary btn-lg btn-block w-75 mx-auto">Sign-up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

SignIn.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users.signUpFormData
});

export default connect(mapStateToProps, { fetchUsers })(SignIn);
