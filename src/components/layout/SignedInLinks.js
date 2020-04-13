import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
    const { user } = props;
    //console.log(user);
    return (
        <ul className="right">
            <li><NavLink activeClassName="active" to='/create'>New Project</NavLink></li>
            <li><a href="/#" onClick={props.logOut}>Logout</a></li>
            <li><NavLink activeClassName="active" to='/' className="btn btn-floating pink lighten-1">{user.initials}</NavLink></li>
        </ul>
    )
}

export default connect(null, { logOut })(SignedInLinks);