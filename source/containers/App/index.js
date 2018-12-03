// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//Components
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';

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
            <provider value = { options }>
                <Feed  />
            </provider>
        );
    }
}
