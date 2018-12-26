/* eslint-disable no-unreachable */
// Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';

//Components
import { withProfile } from 'components/HOC/withProfile';
import { Like } from 'components/Like';

//Instruments
import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
    // eslint-disable-next-line react/no-typos
    static propTypes = {
        _likePost: func.isRequired,
        comment:   string.isRequired,
        created:   number.isRequired,
        likes:     array.isRequired,
        id:        string.isRequired,
    };


    _deletePost = () => {
        const { _deletePost, id } = this.props;

        _deletePost(id);
    }

    render() {
        // eslint-disable-next-line max-len
        const { comment, created, _likePost, id, likes, avatar, currentUserFirstName, currentUserLastName } = this.props;

        //throw new Error();

        return (
            <section className = { Styles.post }>
                <span
                    className = { Styles.cross }
                    onClick = { this._deletePost }
                />
                <img src = { avatar } />
                <a>{`${ currentUserFirstName } ${ currentUserLastName }`}</a>
                <time>{moment.unix(created).format('DD.MM.YY hh:mm a')}</time>
                <p>{comment}</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
}
