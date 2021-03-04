import React from 'react';
import SignUp from './sign-up';
import SignIn from './sign-in';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Dashboard from './dashboard';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'dashboard'
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
      let view;
      if (this.state.view.name === 'sign-up') {
        view = <SignUp setView={this.setView}/>;
      } else if (this.state.view.name === 'sign-in') {
        view = <SignIn setView={this.setView}/>;
      } else if (this.state.view.name === 'dashboard') {
        view = <Dashboard/>
      }
      
      return (
        <div>
          <Provider store={store}>
            {view}
          </Provider>

        </div>
      );
    }
  }
}
