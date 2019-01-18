import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Components
import { withProfile } from 'components/HOC/withProfile';

import Styles from './styles.m.css';

@withProfile
export default class LoginPage extends Component {
    state = {
        username: '',
        password: '',
    };

    validateForm() {
        return this.state.userName.length > 0 && this.state.password.length > 0
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        const { avatar } = this.props;
        const { username, password } = this.state;
        return (
            <div className = { Styles.login }>
                <div>
                    <div>
                        <img src = { avatar } />
                    </div>
                    <form onSubmit={ this.handleSubmit } >
                        <div>
                            <input
                                type="text" 
                                placeholder="username"
                                value={ username }
                                onChange={ this.handleChange }
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="password"
                                value={ password }
                                onChange={ this.handleChange }
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={ !this.validateForm }
                            > 
                                login 
                                <Link to={`/feed`} />
                            </button>  
                        </div>
                    </form>
                </div>
            </div> 
        )
    }
}