// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//Components
import Feed from 'components/Feed';
import avatar from 'theme/assets/hdp2';

const options = {
    avatar,
    currentUserFirstName: 'Joey',
    currentUserLastName:  'Tribbiani',
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Feed { ...options } />
        );
    }
}
