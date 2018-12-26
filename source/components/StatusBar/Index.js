// Core
import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';

@withProfile
export default class StatusBar extends Component {
    state = { err: null };

    handleClick = () => {
        try {
            this.setState({ smthn : smthn + 1 })
          } catch(err) {
            this.setState({ err })
          }
    };

    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        //show error page!
        if (this.state.err)
            throw this.state.err;

        return (
            <section className = { Styles.statusBar } >
                <div>
                    <button 
                        onClick = { this.handleClick }
                    >
                        <img src = { avatar } />
                        <span>{ currentUserFirstName }</span>
                        &nbsp;
                        <span>{ currentUserLastName }</span>
                    </button>
                </div>
            </section>
        );
    }
}