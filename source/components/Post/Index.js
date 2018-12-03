// Core
import React, { Component } from 'react';
//Components
import { Consumer } from 'components/HOC/withProfile';
//Instruments
import moment from 'moment';
import Styles from './styles.m.css';

export default class Post extends Component {
    render() {
        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <img src = { context.avatar } />
                        <a>{` ${ context.currentUserFirstName } ${ context.currentUserLastName } `}
                        </a>
                        <time>{moment().format('DD.MM.YYYY HH:mm:ss')}</time>
                        <p>How You Doooooin!</p>
                    </section>
                )}
            </Consumer>
        );
    }
}
