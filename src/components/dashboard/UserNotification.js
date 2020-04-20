import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { getQueryName } from 'redux-firestore/es/utils/query';
import { userNotificationsQuery } from '../../queries/queries';
import { markNotificationRead } from '../../store/actions/productActions';
import { withRouter, Link } from 'react-router-dom';

const UserNotification = withRouter((props) => {

    const { user } = props;
    const dispatch = useDispatch();

    useFirestoreConnect(userNotificationsQuery(user.handle));
    const error = useSelector(state => state.firestore.errors.byQuery[getQueryName(userNotificationsQuery(user.handle))]);
    const notifications = useSelector(state => state.firestore.ordered.user_notifications);


    const handleClick = (e) => {

        if (e.target.dataset.postid) {
            console.log(e.target.dataset.postid);
        }
        let notificationIds = newNotifications(notifications);
        if (notificationIds?.length > 0)
            dispatch(markNotificationRead(notificationIds));
    }

    useEffect(() => {
        if (notifications) {
            const length = newNotifications(notifications).length;
            props.newNotifications(length || 0);
        }
    }, [props, notifications])

    return (
        <div className="striped">
            {notifications && notifications.length > 0 ? notifications.map(notification => {
                return (
                    <li key={notification.id}>

                        <Link to={`${getPath(props.location.pathname)}/${notification.postId}`} onClick={handleClick} data-postid={notification.postId}>

                            <span className={`tiny material-icons left-align ${notification.read === false ? 'orange-text' : 'cyan-text'}`}>{isLike(notification.type) ? 'favorite' : 'chat'}</span>
                            <span className="pink-text"> {notification.sender} </span>
                            <span>{isLike(notification.type) ? 'liked' : 'commented on'} your post</span>
                            <span className="grey-text note-date">
                                ( {moment(notification.createdAt.toDate()).fromNow()})
                            </span>
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

const getPath = (path) => {
    return path && path.includes('/post/') ? '/post' : '/post';
}

const newNotifications = (notifications) => {
    if (notifications) {
        return notifications
            .filter((not) => !not.read)
            .map((not) => not.id);
    }
}

export default UserNotification;