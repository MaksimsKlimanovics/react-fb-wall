// Core
import React, { Component } from 'react';

//Instruments
import avatar from 'theme/assets/lisa';

export default class Post extends Component {
    render() {
        return (
            <section>
                <section>
                    <img src = { avatar } />
                    <a>Lisa Simpson</a>
                    <time>Today</time>
                    <p>How You Doooooin!</p>
                </section>
            </section>
        );
    }
}