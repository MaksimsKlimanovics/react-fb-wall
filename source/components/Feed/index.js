import React, { Component } from 'react';
import moment from 'moment';

//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import { getUniqueID } from 'instruments';
//Instructions

import Styles from './styles.m.css';

export default class Feed extends Component {
    constructor () {
        super();
        this._createPost = this._createPost.bind(this);
    }

    state = {
        posts:
        [
            {id: '1231', comment: 'Привет!', created: 1544081914 },
            {id: '2345', comment: 'Blaaaaah!!!', created: 1543863250 },
            {id: '2223', comment: 'Šodien ir lietaina diena', created: 1526814336 },
            {id: '2348', comment: 'How you Dooooooin!', created: 1543863900},
        ],
        isPostFetching: false,
    };

    _createPost (comment) {
        const post = {
            id:      getUniqueID(),
            created: moment.utc(),
            comment,
        };

        this.setState(({ posts }) => ({
            posts: [ post, ...posts ],
        }));
    }

    render() {
        const { posts, isPostFetching } = this.state;

        const postJSX = posts.map((post) => {
            // eslint-disable-next-line react/jsx-max-props-per-line
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostFetching }/>
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postJSX}
            </section>
        );
    }
}
