import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signInAction } from '../../store/actions/authActions';
import ToggleButton from '../decoration/ToggleButton';
class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signInAction(this.state);
    }

    render() {
        const { authError, user, isLoading } = this.props;
        if (user.uid) {
            return (
                <Redirect to='/' />
            )
        }

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="gray-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <ToggleButton btnName="Login" disableBtnName="Logging in..." isLoading={isLoading} />
                        <div className="red-text">
                            <p>{authError?.message}</p>
                        </div>
                        New user ? <Link to="/signup" >Click here to Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        user: state.firebase.auth,
        isLoading: state.auth.isLoading
    }
};


export default connect(mapStateToProps, { signInAction })(SignIn);
