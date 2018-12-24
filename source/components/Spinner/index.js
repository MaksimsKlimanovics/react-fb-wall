// Core
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

//Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';

const portal = document.getElementById('spinner');

@withProfile
export default class Spinner extends Component {
    render() {
        const { isSpinning } = this.props;

        return createPortal(
            isSpinning ? <div className = { Styles.spinner } /> : null, portal,

        );
    }
}
