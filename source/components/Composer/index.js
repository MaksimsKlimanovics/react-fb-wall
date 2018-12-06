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
    constructor () {
        super();

        this._updateComment = this._updateComment.bind(this);
        this._submitComment = this._submitComment.bind(this);
    }

    state = {
        comment: '',
    };

    _updateComment (event) {
        this.setState({
            comment: event.target.value,
        });
    };

    _submitComment () {
        const { comment } = this.state;

        if (!comment) {
            return null;
        }

        this.props._createPost(comment);

        this.setState({
            comment: '',
        });
    }

    render() {
        const { comment } = this.state;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.composer }>
                        <img src = { context.avatar }/>
                        <form onSubmit = { this._submitComment }>
                            <textarea
                                placeholder = { `What is on your mind, ${ context.currentUserFirstName }?` }
                                value = { comment }
                                onChange = { this._updateComment }
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
