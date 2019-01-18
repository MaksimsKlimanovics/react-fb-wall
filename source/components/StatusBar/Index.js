// Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import { Link } from 'react-router-dom';

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

    _animateStatusBarEnter = ( statusBar ) => {
        fromTo(statusBar, 1.5 , { opacity: 0 }, { opacity: 1 }); 
    }

    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { online } = this.state;

        const statusStyle = cx(Styles.status, {
            [Styles.online]:   online,
            [Styles.offline]: !online,
        });

        const statusMessage = online ? 'Online' : 'Offline';

        //show error page!
        if (this.state.err)
            throw this.state.err;

        return (
            <Transition
                appear
                in
                timeout = { 4000 }
                onEnter = { this._animateStatusBarEnter }
            >
                <section className = { Styles.statusBar } >
                    <div className = { statusStyle }>
                        <div>{ statusMessage }</div>
                        <span />
                    </div>
                    <Link to = '/profile' >
                        <img src = { avatar } />
                        <span>{ currentUserFirstName }</span>
                    </Link>
                    <Link to = '/feed' >Feed</Link>
                </section>
            </Transition>
        );
    }
}