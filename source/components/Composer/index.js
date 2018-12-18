// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Components
import { Consumer } from 'components/HOC/withProfile';
//Instructions
import Styles from './styles.m.css';
export default class Composer extends Component {
    static propTypes = {
        // eslint-disable-next-line react/no-unused-prop-types
        _createPost: PropTypes.func.isRequired,
    };

    // eslint-disable-next-line react/sort-comp

    state = {
        comment: '',
    };

    _updateComment = (event) => {
        this.setState({
            comment: event.target.value,
        });
    };

    _handleFormSubmit = (event) => {
        event.preventDefault();
        this._submitComment();
    }

    _submitComment = () => {
        const { comment } = this.state;

        if (!comment) {
            return null;
        }

        this.props._createPost(comment);

        this.setState({
            comment: '',
        });
    }

    _submitOnEnter = (event) => {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this._submitComment();
        }
    }

    render() {
        const { comment } = this.state;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.composer }>
                        <img src = { context.avatar }/>
                        <form onSubmit = { this._handleFormSubmit }>
                            <textarea
                                placeholder = { `What is on your mind, ${ context.currentUserFirstName }?` }
                                value = { comment }
                                onChange = { this._updateComment }
                                onKeyPress = { this._submitOnEnter }
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
