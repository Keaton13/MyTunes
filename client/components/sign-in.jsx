import React from 'react';
import Header from './header';

class SignIn extends React.Component {
    render() {
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
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
                            </div>
                        </div>
                        <div className="row w-100 mt-3">
                            <h3 className="font-2">Password</h3>
                            <div className="input-group input-group-lg">
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
                            </div>
                        </div>
                        <div className="row w-100 mt-5">
                            <button type="button" className="btn btn-primary btn-lg btn-block w-75 mx-auto">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn