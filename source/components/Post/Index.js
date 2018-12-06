// Core
import React, { Component } from 'react';
//Components
import { Consumer } from 'components/HOC/withProfile';
import moment from 'moment';
import PropTypes from 'prop-types';
//Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    // eslint-disable-next-line react/no-typos
    static propTypes = {
        comment: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
    };

    render() {
        const { comment, created } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <img src = { context.avatar } />
                        <a>{` ${ context.currentUserFirstName } ${ context.currentUserLastName } `}
                        </a>
                        <time>{moment.unix(created).format('DD.MM.YYYY HH:MM')}</time>
                        <p>{comment}</p>
                    </section>
                )}
            </Consumer>
        );
    }
}
