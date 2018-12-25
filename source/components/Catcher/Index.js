// Core
import React, { Component } from 'react';

//Instruments
import { object } from 'prop-types';
import Styles from './styles.m.css';

export default class Catcher extends Component {
    static propTypes = {
        children: object.isRequired,
    };

    state = {
        error: false,
    };

    componentDidCatch (error, stack) {
        console.log('ERROR:', error);
        console.log('STACKTRACE:', stack.componentStack);

        this.setState({
            error: true,
        });
    };

    render() {
        console.log('--> catcher');
        let cloud1 = `${Styles.cloud} ${Styles.cloud_x1}`;
        let cloud2 = `${Styles.cloud} ${Styles.cloud_x1_5}`;
        let cloud3 = `${Styles.cloud} ${Styles.cloud_x2}`;
        let cloud4 = `${Styles.cloud} ${Styles.cloud_x3}`;
        let cloud5 = `${Styles.cloud} ${Styles.cloud_x4}`;
        let cloud6 = `${Styles.cloud} ${Styles.cloud_x5}`;
        if (this.state.error) {

            return (
                <section>
                    <div id = "clouds">
                        <div className = { cloud1 }></div>
                        <div className = { cloud2 }></div>
                        <div className = { cloud3 }></div>
                        <div className = { cloud4 }></div>
                        <div className = { cloud5 }></div>
                        <div className = { cloud6 }></div>
                    </div>
                    <div className = { Styles.c }>
                        <div className = { Styles._404 }>OMG!</div>
                        <p/>
                        <div className = { Styles._1 }>THE PAGE</div>
                        <div className = { Styles._2 }>IS NOT WORKING!</div>
                        <div className = { Styles._2 }>We hope our engineers are working on this problem right now.<br/>If not - they will be fired!</div>
                        <a className = { Styles.btn } href = '#'>BACK</a>
                    </div>
                </section>
            );
        }

        return this.props.children;
    }
}