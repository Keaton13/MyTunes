import React from 'react';
import SignUp from './sign-up';
import SignIn from './sign-in';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Route, Router, Switch } from 'react-router-dom';
import Dashboard from './dashboard';
import Callback from './callback';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'sign-in'
      }
    };
    this.setView = this.setView.bind(this);

  }

  setView(view) {
    this.setState({
      view: {
        name: view
      }
    });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading!!!!!</h1>;
    } else {
      return (
        <div>
          <Provider store={store}>
            <Switch>
              <Route path="/" exact component={SignIn}/>
              <Route path="/sign-up" component={SignUp}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/callback" component={Callback}/>
            </Switch>
          </Provider>

        </div>
      );
    }
  }
}
