// Core
import React, { Component } from 'react';

//Instruments
import avatar from 'theme/assets/lisa';

export default class Composer extends Component {
    render() {
        return (
            <section>
                <section>
                    <img src = { avatar } />
                    <form>
                        <textarea placeholder = {'What is on your mind, Lisa?'} />
                        <input type = 'submit' value = 'Post' />
                    </form>
                </section> 
            </section>
        );
    }
}