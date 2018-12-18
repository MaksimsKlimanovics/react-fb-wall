import React, { Component } from 'react';
import moment from 'moment';

//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import { getUniqueID, delay } from 'instruments';
//Instructions

import Styles from './styles.m.css';

export default class Feed extends Component {
    constructor () {
        super();
        this._createPost = this._createPost.bind(this);
        this._setPostFetchingState = this._setPostFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
        this._deletePost = this._deletePost.bind(this);
    }

    state = {
        posts:
        [
            {
                id: '2345',
                comment: 'Blaaaaah!!!',
                created: 1543863250,
                likes: [],
            },
            {
                id: '1231',
                comment: 'Привет!',
                created: 1544081914,
                likes: [],
            },
            {
                id: '2223',
                comment:
                'Šodien ir lietaina diena',
                created: 1526814336,
                likes: [],
            },
            {
                id: '2348',
                comment: 'How you Dooooooin!',
                created: 1543863900,
                likes: [],
            },
        ],
        isPostFetching: false,
    };

    _setPostFetchingState (state) {
        this.setState({
            isPostFetching: state,
        });
    }

    async _createPost (comment) {
        this._setPostFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment.utc().unix(),
            comment,
            likes: [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:          [ post, ...posts ],
            isPostFetching: false,
        }));

        //this._setPostFetchingState(false);
    }

    async _likePost (id) {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._setPostFetchingState(true);

        await delay(1200);

        // eslint-disable-next-line react/no-access-state-in-setstate
        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });
        this.setState({
            posts:          newPosts,
            isPostFetching: false,
        });
    }

    async _deletePost (id) {
        this._setPostFetchingState(true); //по аналогии с созданием поста

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:          posts.filter((post) => post.id !== id),
            isPostFetching: false,
        }));
    }

    render() {
        const { posts, isPostFetching } = this.state;

        const postJSX = posts.map((post) => {
            // eslint-disable-next-line react/jsx-max-props-per-line
            return <Post key = { post.id } { ...post } _likePost = { this._likePost } _deletePost = { this._deletePost } />;
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
