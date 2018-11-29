// Core
import React, { Component } from 'react';

//Instruments
import avatar from 'theme/assets/lisa';
import moment from 'moment';
import Styles from './styles.m.css';

export default class Post extends Component {
    render() {
        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>Lisa Simpson</a>
                <time>{moment().format('DD.MM.YYYY HH:mm:ss')}</time>
                <p>How You Doooooin!</p>
            </section>
        );
    }
}
