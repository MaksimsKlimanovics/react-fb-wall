// Core
import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile';
import { socket } from 'socket/init';
import cx from 'classNames';
//Instruments
import Styles from './styles.m.css';

@withProfile
export default class StatusBar extends Component {
    state = {
        err: null,
        online: false,
    };

    componentDidMount () {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });

        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    };

    componentWillUnmount() {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    };

    handleClick = () => {
        try {
            this.setState({ smthn : smthn + 1 })
          } catch(err) {
            this.setState({ err })
          }
    };

    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { online } = this.state;

        const statusStyle = cx(Styles.status, {
            [Styles.online]:   online,
            [Styles.offline]: !online,
        });

        const statusMessage = online ? 'Online' : 'Offline';

        console.log('online', online)

        //show error page!
        if (this.state.err)
            throw this.state.err;

        return (
            <section className = { Styles.statusBar } >
                <div className = { statusStyle }>
                    <div>{ statusMessage }</div>
                    <span />
                </div>
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