// Core
import React, { Component } from 'react';

//Instruments
import moment from 'moment';
import Styles from './styles.m.css';

export default class Post extends Component {
    render() {
        const {
            avatar,
            currentUserLastName,
            currentUserFirstName,
        } = this.props;

        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>{` ${ currentUserFirstName } ${ currentUserLastName } `}
                </a>
                <time>{moment().format('DD.MM.YYYY HH:mm:ss')}</time>
                <p>How You Doooooin!</p>
            </section>
        );
    }
}
