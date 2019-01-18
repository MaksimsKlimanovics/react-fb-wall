import React, { Component } from 'react';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { fromTo } from 'gsap';

//Components
import { withProfile } from 'components/HOC/withProfile';
import { delay } from 'instruments';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import Postman from 'components/Postman';
import Counter from 'components/Counter';

//Instructions
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';

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

        socket.on('like', (postJson) => {
            const { data: likedPost, meta } = JSON.parse(postJson);

            if (`${currentUserFirstName} ${currentUserLastName}` !== 
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({posts}) => ({
                    posts: posts.map(
                        (post) => post.id === likedPost.id ? likedPost: post,
                    ),
                }));
            }
        })

    };

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
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

    _animateComposerEnter = ( composer ) => {
        fromTo(composer, 1.5 , { opacity: 0 }, { opacity: 1 }); 
    }

    _animatePostmanEnter = async ( Postman ) => {
        fromTo(Postman, 3 , { opacity: 0, rotationX: -50}, { opacity: 1, rotationX: 0});
        await delay(5000);
        fromTo(Postman, 3 , { opacity: 1, rotationX: 0}, { opacity: 0, rotationX: -50 });
    }

    render() {
        const { posts, isPostFetching } = this.state;

        const postJSX = posts.map((post) => {
            return (
                <CSSTransition 
                    classNames = {{
                        enter: Styles.postInStart,
                        enterActive: Styles.postInEnd,
                        exit: Styles.postOutStart,
                        exitActive: Styles.postOutEnd,
                    }}
                    key = { post.id }
                    timeout = { {
                        enter: 500,
                        exit: 600,
                    } }
                >
                    <Post
                        { ...post }
                        _likePost = { this._likePost }
                        _deletePost = { this._deletePost }
                    />
                </CSSTransition>
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostFetching }/>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._animateComposerEnter }
                >
                    <Composer _createPost = { this._createPost } />
                </Transition>
                <Counter count = { postJSX.length } />
                <TransitionGroup>{postJSX}</TransitionGroup>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._animatePostmanEnter }
                >
                    <Postman />
                </Transition>
            </section>
        );
    }
}
