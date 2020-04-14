import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {

    useEffect(() => {
        const M = window.M;
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    }, [])

    const { user } = props;
    //console.log(user);
    return (
        <div>
            <ul className="right hide-on-med-and-down">
                <li><NavLink activeClassName="active" to='/create'>New Project</NavLink></li>
                <li><a href="/#" onClick={props.logOut}>Logout</a></li>
                <li><NavLink activeClassName="active" to='/' className="btn btn-floating pink lighten-1">{user.initials}</NavLink></li>
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
                <li><NavLink activeClassName="active" to='/'>Home</NavLink></li>
                <li><NavLink activeClassName="active" to='/create'>New Project</NavLink></li>
                <li><a href="/#" onClick={props.logOut}>Logout</a></li>
                <li><div className="divider"></div></li>
                <li><a href="!#" className="subheader">Subheader</a></li>
                <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
            </ul>
        </div>
    )
}

export default connect(null, { logOut })(SignedInLinks);