import React, { Component } from 'react';

//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
//Instructions

import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [],
    };
    render() {
        const { posts } = this.state;
        const postJSX = posts.map.((post) => {
            return <Post key = { post.id } />;
        });
        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer />
                <Post />
            </section>
        );
    }
}
