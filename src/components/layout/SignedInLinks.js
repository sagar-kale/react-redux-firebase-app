import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOut } from '../../store/actions/authActions';
import { UserStatus } from './UserStatus';
import UserNotification from '../dashboard/UserNotification';

const SignedInLinks = (props) => {

    useEffect(() => {
        const M = window.M;
        //M.AutoInit();
        let sidenav = document.querySelectorAll('.sidenav');
        let dropdown = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdown, { coverTrigger: false, constrainWidth: false });
        M.Sidenav.init(sidenav, {});
    }, []);

    const [totalNotifications, setTotalNotifications] = useState(0);

    const newNotifications = (newNotSize) => {
        setTotalNotifications(newNotSize);
    }

    const { user } = props;
    //console.log(user);
    return (

        <div>
            {user && <UserStatus user={user} />}
            <ul className="right hide-on-med-and-down">
                <li><NavLink className="waves-effect" to='/create'>New Post</NavLink></li>
                <li><NavLink className="waves-effect" to='/chat'>Chat</NavLink></li>
                <li><a href="/" className="waves-effect" onClick={props.logOut}>Logout</a></li>
                <li><NavLink to='/' className="btn btn-floating pink lighten-1 waves-effect">{user.initials}</NavLink></li>
            </ul>
            <ul className="right">
                <li><a className='dropdown-trigger' href='#!' data-target='notifications'><span className="material-icons">notifications</span>
                    {totalNotifications !== 0 && <span className="new badge">{totalNotifications}</span>}</a></li>
            </ul>
            <ul id="slide-out" className="sidenav">
                <li><div className="user-view">
                    <div className="background">
                        <img src={require('../../img/office.jpg')} alt="office" />
                    </div>
                    <img className="circle" src={user.photoURL || require('../..//img/yuna.jpg')} alt="yuna" />
                    <span className="white-text name">{user.firstName} {user.lastName}</span>
                    <span className="white-text email">{user.email}</span>
                </div></li>
                <li><NavLink className="waves-effect sidenav-close" to='/'>Home</NavLink></li>
                <li><NavLink className="waves-effect sidenav-close" to='/create'>New Post</NavLink></li>
                <li><NavLink className="waves-effect sidenav-close" to='/chat'>Chat</NavLink></li>
                <li><a href="/" className="waves-effect sidenav-close" onClick={props.logOut}>Logout</a></li>
                <li><div className="divider"></div></li>
                <li><a href="!#" className="subheader">Extra Links</a></li>
                <li><a className="waves-effect" href="#!">About Us</a></li>
            </ul>
            <ul id='notifications' className='dropdown-content'>
                <UserNotification user={user} newNotifications={newNotifications} />
            </ul>
        </div>
    )
}

export default connect(null, { logOut })(SignedInLinks);