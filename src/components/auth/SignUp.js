import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../store/actions/authActions';
import ToggleButton from '../decoration/ToggleButton';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        handle:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        this.props.register(this.state);
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
                    <h5 className="gray-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="handle" onChange={this.handleChange} required />
                        <small className="gray-text">You will be identified by this handle</small>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <ToggleButton btnName="Register" disableBtnName="Registering new user..." isLoading={isLoading} />

                        <div className="red-text">
                            <p>{authError?.message}</p>
                        </div>
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


export default connect(mapStateToProps, { register })(SignUp);
