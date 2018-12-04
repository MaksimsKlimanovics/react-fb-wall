import React, { Component } from 'react';

//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
//Instructions

import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            {id: '123', comment: 'Привет!', created: 1526814276 },
            {id: '2345', comment: 'Blaaaaah!!!', created: 1543863250},
            {id: '2223', comment: 'Šodien ir lietaina diena', created: 1526814336 },
            {id: '2348', comment: 'How you Dooooooin!', created: 1543863900},
        ],
        isPostRendered: false,
    };

    render() {
        const { posts, isPostRendered } = this.state;

        const postJSX = posts.map((post) => {
            // eslint-disable-next-line react/jsx-max-props-per-line
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostRendered }/>
                <StatusBar />
                <Composer />
                {postJSX}
            </section>
        );
    }
}
