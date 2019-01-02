import React from 'react';
import {number} from 'prop-types';

//Instructions
import Styles from './styles.m.css';

const PostCounter = ({ count }) => (
    <section className = { Styles.counter }>Post count: {count}</section>
);

PostCounter.propTypes = {
    count: number.isRequired,
};

PostCounter.defaultProps = {
    count: 0,
};

export default PostCounter;