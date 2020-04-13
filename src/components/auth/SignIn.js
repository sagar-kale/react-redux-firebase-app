import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signInAction } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom';
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
        const { authError, user } = this.props;
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
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
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
        user: state.firebase.auth
    }
};


export default connect(mapStateToProps, { signInAction })(SignIn);
