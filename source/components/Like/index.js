import React, { Component } from 'react';
import Styles from './styles.m.css';
import { string, arrayOf, shape, func } from 'prop-types';

export class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id: string.isRequired,
        likes: arrayOf(
            shape({
                id: string.isRequired,
                firstName: string.isRequired,
                lastName: string.isRequired,
            })
        ).isRequired,
    };

    render() {
        console.log('this.props', this.props);

        return 'like';
    }
}
