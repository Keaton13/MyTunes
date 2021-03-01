import React from 'react';
import Header from './header';

class SignIn extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row font-2 background-color-1">
            <div className="col text-center my-auto">
              <h2>Sign-Up</h2>
            </div>
          </div>
          <div className="row w-75 mx-auto">
            <div className="row w-100">
              <h3>Username</h3>
              <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
              </div>
            </div>
            <div className="row w-100">
              <h3>Password</h3>
              <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
              </div>
            </div>
            <div className="row w-100">
              <h3>Re-Enter Password</h3>
              <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
              </div>
            </div>
            <div className="row w-100">
              <button type="button" className="btn btn-primary btn-lg btn-block w-75 mx-auto">Submit</button>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default SignIn;
