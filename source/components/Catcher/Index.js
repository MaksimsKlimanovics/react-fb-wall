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
        reload: false,
    };

    componentDidCatch (error, stack) {
        console.log('ERROR:', error);
        console.log('STACKTRACE:', stack.componentStack);

        this.setState({
            error: true,
        });
    };

    handleClick = () => {
        this.setState({ reload : true })
    };

    reloadForm = () => {
        
    };

    render() {
        if (this.state.reload)
          window.location.reload();

        document.body.classList.add(`${Styles.catcher}`);
        console.log('--> catcher');
        let cloud1  = `${Styles.cloud} ${Styles.cloud_x1}`;
        let cloud2  = `${Styles.cloud} ${Styles.cloud_x1_5}`;
        let cloud3  = `${Styles.cloud} ${Styles.cloud_x2}`;
        let cloud4  = `${Styles.cloud} ${Styles.cloud_x3}`;
        let cloud5  = `${Styles.cloud} ${Styles.cloud_x4}`;
        let cloud6  = `${Styles.cloud} ${Styles.cloud_x5}`;

        let cloud7  = `${Styles.c}`;
        let cloud8  = `${Styles._404}`;
        let cloud9  = `${Styles.placeholder}`;
        let cloud10 = `${Styles._1}`;
        let cloud11 = `${Styles._2}`;
        let cloud12 = `${Styles.btn}`;

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
                    <div className = { cloud7}>
                        <div className = { cloud8 }>OMG!</div>
                        <p className = { cloud9 } />
                        <div className = { cloud10 }>THE PAGE</div>
                        <div className = { cloud11 }>IS NOT WORKING!</div>
                        <div className = { cloud11 }>We hope our engineers are working on this problem right now.<br/>If not - they will be fired!</div>
                        <button
                            className = { cloud12 }
                            onClick = {this.handleClick}
                        >
                            BACK
                        </button>
                    </div>
                </section>
            );
        }
        document.body.classList.remove(`${Styles.catcher}`);
        return this.props.children;
    }
}