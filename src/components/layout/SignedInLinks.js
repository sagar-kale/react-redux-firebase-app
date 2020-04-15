import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {

    useEffect(() => {
        const M = window.M;
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    }, [])

    const { user } = props;
    //console.log(user);
    return (
        <div>
            <ul className="right hide-on-med-and-down">
                <li><NavLink className="waves-effect" to='/create'>New Project</NavLink></li>
                <li><a href="/#" className="waves-effect" onClick={props.logOut}>Logout</a></li>
                <li><NavLink to='/' className="btn btn-floating pink lighten-1 waves-effect">{user.initials}</NavLink></li>
            </ul>
            <ul id="slide-out" className="sidenav">
                <li><div className="user-view">
                    <div className="background">
                        <img src={require('../../img/office.jpg')} alt="office" />
                    </div>
                    <img className="circle" src={require('../..//img/yuna.jpg')} alt="yuna" />
                    <span className="white-text name">{user.firstName} {user.lastName}</span>
                    <span className="white-text email">{user.email}</span>
                </div></li>
                <li><NavLink className="waves-effect sidenav-close" to='/'>Home</NavLink></li>
                <li><NavLink className="waves-effect sidenav-close" to='/create'>New Project</NavLink></li>
                <li><NavLink to="/" className="waves-effect sidenav-close" onClick={props.logOut}>Logout</NavLink></li>
                <li><div className="divider"></div></li>
                <li><a href="!#" className="subheader">Extra Links</a></li>
                <li><a className="waves-effect" href="#!">About Us</a></li>
            </ul>
        </div>
    )
}

export default connect(null, { logOut })(SignedInLinks);