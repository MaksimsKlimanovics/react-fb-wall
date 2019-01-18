// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import LoginPage from 'components/Login';
import { Provider } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';


import avatar from 'theme/assets/joey';

const options = {
    avatar,
    currentUserFirstName: 'Максим',
    currentUserLastName:  'Климанович',
    isLoggedIn: false,
};

const auth = {
    isAuthenticated: false,
    
    authenticate(pg) {
      this.isAuthenticated = true
      setTimeout(pg, 100) // fake async
    },

    signout(pg) {
      this.isAuthenticated = false
      setTimeout(pg, 100) // fake async
    }
  }
@hot(module)
export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar />
                    <Switch>
                        <Route component = { LoginPage } exact path="/" />
                        <Route  component = { Profile }   path = '/profile' />
                        <Route  component = { Feed }      path = '/feed' />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
