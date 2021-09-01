import React from 'react';
import Header from './header';
import PropTypes from 'prop-types';
import { createUserProfile } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordCheck: '',
      status: {
        password: false
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendUserData = this.sendUserData.bind(this);

  }

  sendUserData() {
    if (this.state.password === this.state.passwordCheck) {
      const data = this.state;
      this.props.createUserProfile(data);
    } else {
      console.log('Error! passwords do not match');
      this.setState({
        status: {
          password: true
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

      case 'passwordCheck':
        this.setState({
          passwordCheck: e.target.value
        });
        break;
    }
  }

  render() {
    if (this.props.signUpFormData.status == 200) {
      return <Redirect to='/'/>;
    } else {
      return (
        <div className="background-color-3">
          <Header />
          <div className="container background-color-2 max-width-sign-in min-height-sign-in">
            <div className="row font-2 background-color-1 sign-up-row-height">
              <div className="col text-center my-auto">
                <h2>Sign-Up</h2>
              </div>
            </div>
            <div className="row w-75 mx-auto mt-4">
              <div className="row w-100 mt-3">
                <h3 className="font-2">Username</h3>
                <div className="input-group input-group-lg">
                  <input type="text" value={this.state.username} onChange={e => this.handleInputChange(e)} name="username" placeholder="Username" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
                </div>
              </div>
              <div className="row w-100 mt-3">
                <h3 className="font-2">Password</h3>
                <div className="input-group input-group-lg">
                  <input type="password" value={this.state.password} onChange={e => this.handleInputChange(e)} name="password" placeholder="Password" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
                </div>
              </div>
              <div className="row w-100 mt-3">
                <h3 className="font-2">Re-Enter Password</h3>
                <div className="input-group input-group-lg">
                  <input type="password" value={this.state.passwordCheck} onChange={e => this.handleInputChange(e)} name="passwordCheck" placeholder="Re-enter Passowrd" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
                </div>
              </div>
              <div className="row w-100 mt-5">
                <button type="button" onClick={this.sendUserData} className={this.state.status.password === true ? "btn btn-primary btn-lg btn-block w-75 mx-auto" : "btn btn-primary btn-lg btn-block w-75 mx-auto outlineRed"}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

SignUp.propTypes = {
  createUserProfile: PropTypes.func.isRequired,
  signUpFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  signUpFormData: state.users.signUpFormData
});

export default connect(mapStateToProps, { createUserProfile })(SignUp);
