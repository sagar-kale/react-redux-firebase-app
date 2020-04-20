import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Link, withRouter } from 'react-router-dom';
import { userNotificationsQuery } from '../../queries/queries';
import { markNotificationRead } from '../../store/actions/productActions';
import { getPath } from '../../utils/helpers';

const UserNotification = withRouter((props) => {

    const { user } = props;
    const dispatch = useDispatch();

    useFirestoreConnect(userNotificationsQuery(user.handle));
    // const error = useSelector(state => state.firestore.errors.byQuery[getQueryName(userNotificationsQuery(user.handle))]);
    const notifications = useSelector(state => state.firestore.ordered.user_notifications);

    const handleClick = (e) => {
        let notificationIds = newNotifications(notifications);
        if (notificationIds?.length > 0)
            dispatch(markNotificationRead(notificationIds));
    }

    useEffect(() => {
        if (notifications) {
            const length = newNotifications(notifications).length;
            props.newNotifications(length || 0);
        }
    }, [props, notifications]);

    return (
        <div>
            {notifications && notifications.length > 0 ? notifications.map(notification => {
                return (
                    <li key={notification.id}>

                        <Link to={`${getPath(props.location.pathname)}/${notification.postId}`} onClick={handleClick}>

                            <small className={`tiny material-icons left-align ${notification.read === false ? 'orange-text' : 'cyan-text'}`}>{isLike(notification.type) ? 'favorite' : 'chat'}</small>
                            <small className="pink-text"> {notification.sender} </small>
                            <small>{isLike(notification.type) ? 'liked' : 'commented on'} your post</small>
                            <small className="grey-text note-date">
                                ( {moment(notification.createdAt.toDate()).fromNow()})</small>
                        </Link>
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
});

const isLike = (val) => {
    if (val) {
        return val === 'like';
    }
    return false;
}

const newNotifications = (notifications) => {
    if (notifications) {
        return notifications
            .filter((not) => !not.read)
            .map((not) => not.id);
    }
}

export default UserNotification;