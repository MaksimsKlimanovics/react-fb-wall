// Core
import React, { Component } from 'react';

//Instruments
import avatar from 'theme/assets/lisa';
import moment from 'moment';

export default class Post extends Component {
    render() {
        return (
            <section>
                <img src = { avatar } />
                <a>Lisa Simpson</a>
                <time>{moment().format('DD.MM.YYYY HH:mm:ss')}</time>
                <p>How You Doooooin!</p>
            </section>
        );
    }
}