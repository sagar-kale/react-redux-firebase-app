import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { NavLink } from 'react-router-dom';
import { userNotificationsQuery } from '../../queries/queries';
import { logOut } from '../../store/actions/authActions';
import { isSafari, newNotifications } from '../../utils/helpers';
import UserNotification from '../dashboard/UserNotification';
import { UserStatus } from './UserStatus';
import officeImg from '../../img/office.jpg';
import picLogo from '../../img/yuna.jpg';

const SignedInLinks = (props) => {

    const [totalNotifications, setTotalNotifications] = useState(0);
    const { user } = props;


    useFirestoreConnect(userNotificationsQuery(user.handle));
    // const error = useSelector(state => state.firestore.errors.byQuery[getQueryName(userNotificationsQuery(user.handle))]);
    const notifications = useSelector(state => state.firestore.ordered.user_notifications);

    useEffect(() => {
        const M = window.M;
        M.AutoInit();
        // let sidenav = document.querySelectorAll('.sidenav');
        let dropdown = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdown, { coverTrigger: false, constrainWidth: false });
        // M.Sidenav.init(sidenav, {});

        if (notifications) {
            const length = newNotifications(notifications).length;
            setTotalNotifications(length || 0)
        }
    }, [notifications]);

    return (

        <div>
            {user && <UserStatus user={user} />}
            <ul className="right hide-on-med-and-down">
                <li activeclassname="active"><NavLink className="waves-effect" to='/create'>New Post</NavLink></li>
                <li activeclassname="active"><NavLink className="waves-effect" to='/chat'>Chat</NavLink></li>
                <li activeclassname="active"><a href="/" className="waves-effect" onClick={props.logOut}>Logout</a></li>
                <li activeclassname="active"><NavLink to='/' className="btn btn-floating pink lighten-1 waves-effect">{user.initials}</NavLink></li>
            </ul>
            <ul className="right">
                {isSafari() === false ?
                    <li activeclassname="active"><a className='dropdown-trigger' href='#!' data-target='notifications'><span className="material-icons">notifications</span>
                        {totalNotifications !== 0 && <span className="new badge">{totalNotifications}</span>}</a></li>
                    : <li activeclassname="active"><NavLink to='/inote'>
                        <span className="material-icons">notifications</span>
                        {totalNotifications !== 0 && <span className="new badge">{totalNotifications}</span>}
                    </NavLink></li>}
            </ul>
            <ul id="slide-out" className="sidenav">
                <li><div className="user-view">
                    <div className="background">
                        <img src={officeImg} alt="office" />
                    </div>
                    <img className="circle" src={user.photoURL || picLogo} alt="yuna" />
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
                <UserNotification user={user} notifications={notifications} />
            </ul>
        </div>
    )
}

export default connect(null, { logOut })(SignedInLinks);