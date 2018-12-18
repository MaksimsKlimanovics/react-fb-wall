// Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';

//Components
import { Consumer } from 'components/HOC/withProfile';
import { Like } from 'components/Like';

//Instruments
import Styles from './styles.m.css';

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
        const { comment, created, _likePost, id, likes } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <span
                            className = { Styles.cross }
                            onClick = { this._deletePost }
                        />
                        <img src = { context.avatar } />
                        <a>{`${ context.currentUserFirstName } ${ context.currentUserLastName }`}</a>
                        <time>{moment.unix(created).format('DD.MM.YY hh:mm a')}</time>
                        <p>{comment}</p>
                        <Like
                            _likePost = { _likePost }
                            id = { id }
                            likes = { likes }
                            { ...context }
                        />
                    </section>
                )}
            </Consumer>
        );
    }
}
