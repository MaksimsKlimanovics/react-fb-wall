// Core
import React, { Component } from 'react';

//Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';

import avatar from 'theme/assets/joey';

const options = {
    avatar,
    currentUserFirstName: 'Joey',
    currentUserLastName:  'Tribbiani',
};

export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed />
                </Provider>
            </Catcher>
        );
    }
}
