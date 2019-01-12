// Core
import React, { Component } from 'react';
import { func, string } from 'prop-types';
//Components
import { withProfile } from 'components/HOC/withProfile';
//Instructions
import Styles from './styles.m.css';

//@withProfile
export class Composer extends Component {
    static propTypes = {
        // eslint-disable-next-line react/no-unused-prop-types
        _createPost:          func.isRequired,
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
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
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar }/>
                <form onSubmit = { this._handleFormSubmit }>
                    <textarea
                        placeholder = { `What is on your mind, ${ currentUserFirstName }?` }
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
        );
    }
}
export default withProfile(Composer);