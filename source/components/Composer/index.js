// Core
import React, { Component } from 'react';
//Components
import { Consumer } from 'components/HOC/withProfile';
//Instructions
import Styles from './styles.m.css';
export default class Composer extends Component {
    render() {
        const { avatar,
            currentUserFirstName,
        } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.composer }>
                        <img src = { context.avatar }/>
                        <form>
                            <textarea
                                placeholder = { `What is on your mind, ${ context.currentUserFirstName }?` }
                            />
                            <input
                                type = 'submit'
                                value = 'Post'
                            />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
