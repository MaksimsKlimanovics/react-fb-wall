/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import Styles from './styles.m.css';
import { string, arrayOf, shape, func } from 'prop-types';
import cx from 'classNames';

export class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     arrayOf(
            shape({
                id:        string.isRequired,
                firstName: string.isRequired,
                lastName:  string.isRequired,
            }),
        ).isRequired,
    };

    constructor () {
        super();
        this._getLikedByMe = this._getLikedByMe.bind(this);
        this._getLikeStyles = this._getLikeStyles.bind(this);
        this._likePost = this._likePost.bind(this);
        this._showLikers = this._showLikers.bind(this);
        this._hideLikers = this._hideLikers.bind(this);
        this._getLikersList = this._getLikersList.bind(this);
    }

    state = {
        showLikers: false
    }

    _showLikers () {
        this.setState({
            showLikers: true
        });
    }

    _hideLikers () {
        this.setState({
            showLikers: false
        });
    }

    _likePost () {
        const { _likePost, id } = this.props;

        _likePost(id);
    }

    _getLikedByMe() {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) => {
            return (
                `${firstName} ${lastName}` === `${currentUserFirstName} 
                    ${currentUserLastName}`
            );
        });
    }

    _getLikeStyles() {
        const likedByMe = this._getLikedByMe();

        return cx(Styles.icon, {
            [ Styles.liked ]: likedByMe,
        });
    }

    _getLikersList () {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName, id }) => <li key = {id}>{`${firstName} ${lastName}`}</li>)
    }

    render() {
        const likeStyles = this._getLikeStyles();

        //console.log('this.props', this.props);

        return (
            <section className = { Styles.like }>
                <span
                    className = { likeStyles }
                    onClick = { this._likePost }>
                    Like
                </span>
                <div>
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        0
                    </span>
                </div>
            </section>
        );
    }
}
