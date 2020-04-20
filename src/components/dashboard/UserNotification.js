import moment from 'moment';
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { getQueryName } from 'redux-firestore/es/utils/query';
import { userNotificationsQuery } from '../../queries/queries';
import { markNotificationRead } from '../../store/actions/productActions';

const UserNotification = (props) => {

    const { user } = props;
    const dispatch = useDispatch();

    useFirestoreConnect(userNotificationsQuery(user.handle));
    const error = useSelector(state => state.firestore.errors.byQuery[getQueryName(userNotificationsQuery(user.handle))]);
    const notifications = useSelector(state => state.firestore.ordered.user_notifications);

    const handleClick = (e) => {
        let notificationIds = notifications
            .filter((not) => !not.read)
            .map((not) => not.id);
        if (notificationIds?.length > 0)
            dispatch(markNotificationRead(notificationIds));
    }

    return (
        <div className="striped">
            {notifications && notifications.length > 0 ? notifications.map(notification => {
                return (
                    <li key={notification.id}>

                        <a href="#!" onClick={handleClick}>

                            <span className={`tiny material-icons left-align ${notification.read === false ? 'orange-text' : 'cyan-text'}`}>{isLike(notification.type) ? 'favorite' : 'chat'}</span>
                            <span className="pink-text"> {notification.sender} </span>
                            <span>{isLike(notification.type) ? 'liked' : 'commented on'} your post</span>
                            <span className="grey-text note-date">
                                ( {moment(notification.createdAt.toDate()).fromNow()})
                            </span>
                        </a>
                    </li>

                )
            }) :
                <li>
                    <Fragment >
                        <Fragment><span className="card-content pink-text mt4">No new notifications</span></Fragment>
                    </Fragment>
                </li>
            }
        </div >
    )
}

const isLike = (val) => {
    if (val) {
        return val === 'like';
    }
    return false;
}

export default UserNotification;