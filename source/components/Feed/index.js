import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';

//Instructions

import Styles from './styles.m.css';

@withProfile
export default class Feed extends Component {
    state = {
        posts:
        [],
        isPostFetching: false,
    };

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJson) => {
            const { data: createdPost, meta } = JSON.parse(postJson);

            if (`${currentUserFirstName} ${currentUserLastName}` !== 
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
               }));
            }
        });

        socket.on('remove', (postJson) => {
            const { data: removedPost, meta } = JSON.parse(postJson);

            if (`${currentUserFirstName} ${currentUserLastName}` !== 
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter(post => post.id !== removedPost.id),
                }));
            }
        });

    };

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('remove');
    }

    _setPostFetchingState = (state) => {
        this.setState({
            isPostFetching: state,
        });
    }

    _fetchPosts = async () => {
        this._setPostFetchingState(true);

        const response = await fetch (api, {
            method: 'GET'
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isPostFetching: false,
        });
    }

    _createPost = async (comment) => {
        this._setPostFetchingState(true);

        const response = await fetch (api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ comment }),

        });

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts:          [ post, ...posts ],
            isPostFetching: false,
        }));

        //this._setPostFetchingState(false);
    }

    _likePost = async (id) => {
        this._setPostFetchingState(true);

        const response = await fetch (`${api}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();

        this.setState(({posts}) => ({
            posts: posts.map(
                (post) => post.id === likedPost.id ? likedPost: post,
            ), isPostFetching: false,
        }));
    }

    _deletePost = async (id) => {
        this._setPostFetchingState(true); //по аналогии с созданием поста

        await fetch (`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => ({
            posts:          posts.filter((post) => post.id !== id),
            isPostFetching: false,
        }));
    }

    render() {
        const { posts, isPostFetching } = this.state;

        const postJSX = posts.map((post) => {
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
